import "./App.css";
import React, { useState, useEffect } from "react";
import { useERC20Balances } from "react-moralis";
import axios from "axios";
import { ethers } from "ethers";
import { Route, /* Link, */ Routes /* , Navigate */ } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import Home from "./Components/Home";
import Transak from "./Components/Transak";
/* import { Line, Pie, Chart } from "react-chartjs-2"; */
// import PiePort from "./Components/PiePort.js"

import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./LogoMakr-1ceYNX.png";

const moment = require("moment");
const { utils /* , BigNumber */ } = require("ethers");

function App() {
  //handle State

  const [account, setAccount] = useState("");
  //handle fetching analytics using moralis, gecko state

  //provider and signer
  let provider;

  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  let signer;
  if (window.ethereum) {
    // eslint-disable-next-line
    signer = provider.getSigner();
  }
  // eslint-disable-next-line
  const [areTokensGeckoInitialized, setAreTokensGeckoInitialized] =
    useState(false);
  const [areTokensFetched, setAreTokensFetched] = useState(false);
  //getting al ERC20 tokens moralis hook
  // eslint-disable-next-line
  const { fetchERC20Balances, data, isFetching, error } = useERC20Balances({
    data: [],
  });
  //final object used to display and handle every ERC20 token
  const [finalObject, setFinalObject] = useState([
    {
      name: "name",
      symbol: "symbol",
      logo: "logo",
      holderValue: "how much are his holdings worth",
      balance: "balance",
      price: "price",
      decimals: "decimals",
      token_address: "addressOfToken",
      marketCap: "marketCap",
      volume: "volume",
      priceChange: "24Hour",
    },
  ]);
  //intermediate while InitializingPort
  let finalArray = undefined;

  //requesting account and chainId when user first connected to metamask
  useEffect(() => {
    if (provider) {
      FirstLoadGettingAccount();
      gettingNetworkNameChainId();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function FirstLoadGettingAccount() {
    // eslint-disable-next-line
    if (typeof window.ethereum !== undefined) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      window.alert("Install Metamask!");
    }
  }

  //on chain change
  useEffect(() => {
    if (provider) {
      window.ethereum.on("chainChanged", handleChainChanged);
      return () => {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    } // eslint-disable-next-line
  }, []);

  function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }

  //on account change
  useEffect(() => {
    if (provider) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      window.location.reload();
    }
  }
  //network
  const [network, setNetwork] = useState({
    chanId: "",
    name: "",
  });
  async function gettingNetworkNameChainId() {
    const network = await provider.getNetwork();
    setNetwork(network);
  }

  //used to calculate your Eth balance from bigNum
  function bigNumIntoEther4Decimals(data) {
    // from stackexchange https://ethereum.stackexchange.com/questions/84004/ethers-formatetherwei-with-max-4-decimal-places/97885
    let remainder = data.mod(1e14);
    console.log(utils.formatEther(data.sub(remainder)));
    let res = utils.formatEther(data);
    res = Math.round(res * 1e4) / 1e4;
    return res;
  }

  //fetching the ERC20 holdings of an address
  async function getTokens() {
    if (account === "") {
      return window.alert("You need to install and log into Metamask");
    }
    let id = network.chainId.toString(16);
    id = "0x" + id;

    //crazy many ERC20 0x3aB28eCeDEa6cdb6feeD398E93Ae8c7b316B1182
    //mainnet test address 0x953a97B1f704Cb5B492CFBB006388C0fbcF34Bb4
    if (account !== "") {
      await fetchERC20Balances({
        params: {
          chain: id,
          address: account,
        },
      });

      if (isFetching === false) {
        let balance = await provider.getBalance(account);
        // eslint-disable-next-line
        balance = await bigNumIntoEther4Decimals(balance);
        setAreTokensFetched(true);
        return;
      } else if (account !== "") {
        await fetchERC20Balances({
          params: {
            chain: id,
            address: account,
          },
        });

        if (isFetching === false) {
          let balance = await provider.getBalance(account);
          // eslint-disable-next-line
          balance = await bigNumIntoEther4Decimals(balance);
          setAreTokensFetched(true);
        }
      }
    }
  }

  const [portfolioBalance, setPortfolioBalance] = useState(0);

  //fetching all the data for every coin the user holds
  async function intializePortPage() {
    console.log(
      "intializePortPage just ran with " + finalArray + " as finalArray"
    );
    if (finalArray !== undefined || areTokensFetched === false) {
      console.log("already initialized");
      return;
    } else {
      finalArray = [];
      // eslint-disable-next-line
      data.map((e) => {
        let num = 1 / 10 ** e.decimals;
        let bal = e.balance * num;
        finalArray.push({
          name: e.name,
          symbol: e.symbol,
          logo: e.logo,
          holderValue: "No information on gecko available",
          balance: bal,
          price: "No information on gecko available",
          decimals: e.decimals,
          token_address: e.token_address,
          marketCap: "No information on gecko available",
          volume: "No information on gecko available",
          priceChange: "No information on gecko available",
        });
      });

      setFinalObject(finalArray);

      let something = [];

      /*  try {
        //here
        await Promise.all(
          finalArray.map(async (e, i) => {
            let address = e.token_address;
            console.log("token Address = " + address);
            let result = await axios.get(
              `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
            );
            let num = 1 / 10 ** e.decimals;
            let bal = e.balance * num;
            something.push({
              name: e.name,
              symbol: e.symbol,
              logo: e.logo,
              holderValue: bal * result.data[address].usd,
              balance: bal,
              price: result.data[address].usd,
              decimals: e.decimals,
              token_address: e.token_address,
              marketCap: result.data[address].usd_market_cap,
              volume: result.data[address].usd_24h_vol,
              priceChange: result.data[address].usd_24h_change,
            });
          })
        );
      } catch (error) {
        console.log("error while pushing into 'something' array ");
        if (error.response) {
          console.log(error.response);
          console.log("this is the error response");
        }
        return;
      }
      console.log("This is the 'something' array = " + something);
      setFinalObject(something); */

      let wholeBalance = 0;
      // eslint-disable-next-line
      something.map((e) => {
        wholeBalance += e.holderValue;
      });
      setPortfolioBalance(wholeBalance);
      setAreTokensGeckoInitialized(true);
    }
  }
  // eslint-disable-next-line
  async function getCoinGeckoInfo() {
    let something = [];

    let bool = true;
    try {
      //here
      await Promise.all(
        finalObject.map(async (e, i) => {
          let address = e.token_address;

          let result = await axios
            .get(
              `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
            )
            .catch(function (error) {
              something.push({
                name: e.name,
                symbol: e.symbol,
                logo: e.logo,
                holderValue:
                  // bal * result.data[address].usd,
                  "?",
                balance: e.balance,
                price: "?",
                decimals: e.decimals,
                token_address: e.token_address,
                marketCap: "?",
                volume: "?",
                priceChange: "?",
              });

              bool = false;
            });

          // let num = 1 / 10 ** e.decimals;
          // let bal = e.balance * num;
          if (bool) {
            something.push({
              name: e.name,
              symbol: e.symbol,
              logo: e.logo,
              holderValue:
                // bal * result.data[address].usd,
                e.balance * result.data[address].usd,
              balance: e.balance,
              price: result.data[address].usd,
              decimals: e.decimals,
              token_address: e.token_address,
              marketCap: result.data[address].usd_market_cap,
              volume: result.data[address].usd_24h_vol,
              priceChange: result.data[address].usd_24h_change,
            });
          }
          bool = true;
        })
      );
    } catch (error) {
      console.log("error while pushing into 'something' array ");
      return;
    }

    setFinalObject(something);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [fetched, setFetched] = useState(false);
  async function getAllData() {
    if (fetched === false) {
      await Promise.all(finalObject.map(fetchData));
      setFetched(true);
    }
    return;
  }

  /*  setAreTokensGeckoInitialized(true); */
  function fetchData(e) {
    // eslint-disable-next-line
    let something = [];
    let address = e.token_address;
    setFinalObject((e) => [...e.slice(1)]);
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
      )
      .then(function (result) {
        /*  something.push({
          name: e.name,
          symbol: e.symbol,
          logo: e.logo,
          holderValue:
            // bal * result.data[address].usd,
            e.balance * result.data[address].usd,
          balance: e.balance,
          price: result.data[address].usd,
          decimals: e.decimals,
          token_address: e.token_address,
          marketCap: result.data[address].usd_market_cap,
          volume: result.data[address].usd_24h_vol,
          priceChange: result.data[address].usd_24h_change,
        }); */
        let newObj = {
          name: e.name,
          symbol: e.symbol,
          logo: e.logo,
          holderValue:
            // bal * result.data[address].usd,
            e.balance * result.data[address].usd,
          balance: e.balance,
          price: result.data[address].usd,
          decimals: e.decimals,
          token_address: e.token_address,
          marketCap: result.data[address].usd_market_cap,
          volume: result.data[address].usd_24h_vol,
          priceChange: result.data[address].usd_24h_change,
        };
        setFinalObject((oldarray) => [...oldarray, newObj]);

        setPortfolioBalance((a) => (a += e.balance * result.data[address].usd));
        return;
      })
      .catch(function (error) {
        /*  something.push({
          name: e.name,
          symbol: e.symbol,
          logo: e.logo,
          holderValue:
            // bal * result.data[address].usd,
            "?",
          balance: e.balance,
          price: "?",
          decimals: e.decimals,
          token_address: e.token_address,
          marketCap: "?",
          volume: "?",
          priceChange: "?",
        });
        console.log("error");
        bool = false;
      }); */
        let newObj = {
          name: e.name,
          symbol: e.symbol,
          logo: e.logo,
          holderValue:
            // bal * result.data[address].usd,
            "No information available",
          balance: e.balance,
          price: "No information available",
          decimals: e.decimals,
          token_address: e.token_address,
          marketCap: "No information available",
          volume: "No information available",
          priceChange: "No information available",
        };
        setFinalObject((oldarray) => [...oldarray, newObj]);
        // setFinalObject((e) => [...e.slice(1)]);
        /*  console.log(finalObject);
        setFinalObject((e) => e.slice(1));
        console.log(finalObject); */
        return;
      });

    // setFinalObject(something);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(
    () => {
      intializePortPage();
      console.log("Tokens have been fetched using moralis");
    }, // eslint-disable-next-line
    [areTokensFetched]
  );

  //ERC20 price history Fetching
  const [daysNum, setDaysNum] = useState(29);

  function changeDayInterval(num) {
    setDaysNum(num);
    console.log(daysNum);
  }

  //chart stuff
  const [chartDataPrice, setChartDataPrice] = useState({
    labels: ["No Data"],
    datasets: [
      {
        label: "No Token selected",
        data: [0],
      },
    ],
  });

  const [chartDataVolume, setChartDataVolume] = useState({
    labels: ["No Data"],
    datasets: [
      {
        label: "No Token selected",
        data: [0],
      },
    ],
  });

  const [chartDataMarketCap, setChartDataMarketCap] = useState({
    labels: ["No Data"],
    datasets: [
      {
        label: "No Token selected",
        data: [0],
      },
    ],
  });

  const [currentIndex, setCurrentIndex] = useState();

  async function generatingHistoryStats(index) {
    let result;
    try {
      result = await axios.get(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${index.token_address}/market_chart/?vs_currency=usd&days=${daysNum}&interval=daily`
      );
    } catch (error) {
      console.log(error);
      return;
    }

    let dates1 = Array(Number(daysNum))
      .fill()
      .map((e, i) => moment().subtract(i, "d").format("YYYY-MM-DD"))
      .reverse();

    setChartDataPrice({
      labels: dates1,
      datasets: [
        {
          label: `${index.name} Price`,
          data: result.data.prices.map((index) => index[1]),
        },
      ],
    });

    setChartDataVolume({
      labels: dates1,
      datasets: [
        {
          label: `${index.name} Volume`,
          data: result.data.total_volumes.map((index) => index[1]),
        },
      ],
    });

    setChartDataMarketCap({
      labels: dates1,
      datasets: [
        {
          label: `${index.name} Market Cap`,
          data: result.data.market_caps.map((index) => index[1]),
        },
      ],
    });

    setCurrentIndex(index);
  }

  useEffect(
    () => {
      console.log(
        "daysNum has been changed to " +
          daysNum +
          " generatingHistoryStats will refetch"
      );
      generatingHistoryStats(currentIndex);
    }, // eslint-disable-next-line
    [daysNum]
  );

  //after you logged in with UD but not having fetched and Initialized your ERC20's
  if (areTokensFetched === false) {
    return (
      <div className="pages " style={{ height: "100vh" }}>
        <Navbar
          account={account}
          networkName={network.name}
          networkChainId={network.chainId}
        />
        <div
          className="text-center"
          style={{ paddingTop: "26vh", marginRight: "5vw" }}
        >
          <img alt="app logo" src={logo}></img>
        </div>
        <h2 className="text-center" style={{ paddingTop: "1vh" }}>
          You are ready to fetch your ERC20's!
        </h2>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <button
          className="btn  col-md-2 offset-md-5 btn-outline-primary"
          onClick={() => getTokens()}
        >
          Get Started!
        </button>
        <button
          onClick={(e) => FirstLoadGettingAccount()}
          className="btn  col-md-2 offset-md-5 btn-outline-primary"
        >
          Metamask
        </button>
        <footer
          id="footer"
          className="fixed-bottom"
          style={{ marginTop: "10vh" }}
        >
          <i className="fab fa-github">&nbsp;&nbsp;&nbsp; </i>
          <i className="fab fa-twitter">&nbsp;&nbsp;&nbsp; </i>
          <i className="fab fa-discord">&nbsp;&nbsp;&nbsp;</i>
          <i className="fab fa-linkedin-in">&nbsp;&nbsp;&nbsp;</i>
          <i className="fab fa-youtube">&nbsp;&nbsp;&nbsp;</i>
        </footer>
      </div>
    );
  }

  //the portfolio page after logged in and everything is done
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <Navbar
        account={account}
        networkName={network.name}
        networkChainId={network.chainId}
      />
      <Routes>
        <Route exact path="/Transak" element={<Transak />}></Route>
        <Route
          exact
          path="/"
          element={
            <Home
              portfolioBalance={portfolioBalance}
              getTokens={getTokens}
              getAllData={getAllData}
              changeDayInterval={changeDayInterval}
              chartDataPrice={chartDataPrice}
              chartDataVolume={chartDataVolume}
              chartDataMarketCap={chartDataMarketCap}
              data={data}
              finalObject={finalObject}
              generatingHistoryStats={generatingHistoryStats}
            />
          }
        ></Route>
      </Routes>

      <footer
        id="footer"
        className="fixed-bottom"
        style={{ marginTop: "10vh" }}
      >
        <i className="fab fa-github">&nbsp;&nbsp;&nbsp; </i>
        <i className="fab fa-twitter">&nbsp;&nbsp;&nbsp; </i>
        <i className="fab fa-discord">&nbsp;&nbsp;&nbsp;</i>
        <i className="fab fa-linkedin-in">&nbsp;&nbsp;&nbsp;</i>
        <i className="fab fa-youtube">&nbsp;&nbsp;&nbsp;</i>
      </footer>
    </div>
  );
}

export default App;
