import { Line /* , Pie, Chart  */ } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import React /* , { useState, useEffect }  */ from "react";
/* import logo from "../LogoMakr-1ceYNX.png";
import Navbar from "./Navbar"; */
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
/* import { positions } from "@mui/system"; */
const Home = ({
  portfolioBalance,
  getTokens,
  getAllData,
  changeDayInterval,
  chartDataPrice,
  chartDataVolume,
  chartDataMarketCap,
  data,
  finalObject,
  generatingHistoryStats,
  areTokensFetched,
}) => {
  //if you dont hold any tokens

  if (areTokensFetched === true && finalObject.length <= 0) {
    return (
      <Box /* className="pages " */ style={{ height: "100vh" }}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/*  <Navbar account={props.account} networkName={network.name} networkChainId={network.chainId} udLoginDomain={udLoginDomain}/> */}
        <h1 /* className="text-center" */ style={{ paddingTop: "30vh" }}>
          It seems Like you do not own any ERC20 yet!
        </h1>
        <h2 /* className="text-center" */>
          Get yourself your first ERC20 right here!
        </h2>
        <Button /* className=" text-center" */>Here</Button>
        {/*   <footer
          id="footer"
          className="fixed-bottom"
          style={{ marginTop: "10vh" }}
        >
          <i className="fab fa-github">&nbsp;&nbsp;&nbsp; </i>
          <i className="fab fa-twitter">&nbsp;&nbsp;&nbsp; </i>
          <i className="fab fa-discord">&nbsp;&nbsp;&nbsp;</i>
          <i className="fab fa-linkedin-in">&nbsp;&nbsp;&nbsp;</i>
          <i className="fab fa-youtube">&nbsp;&nbsp;&nbsp;</i>
        </footer> */}
      </Box>
    );
  }

  return (
    <Box>
      <h1
        /* className="d-flex justify-content-center" */
        style={{ paddingTop: "2vh" }}
      >
        {portfolioBalance} USD
      </h1>
      <Box className="wrapper">
        <Box
          component={"p"}
          variant={"p"}
          className="first"
          /*  style={{ width: "50%" }} */
        >
          {/* <Button
        className="btn btn-danger offset-md-1"
        style={{ fontSize: "70%" }}
        onClick={() => getTokens()}
      >
        Refetch
      </Button> */}
          {/*  <Box className="col-md-4 offset-md-1" style={{ fontSize: "70%" }}>
        Refetch Portfolio in case Moralis or CoinGeckos API has issues and You
        can not see your Data instantly
      </Box> */}
          {/* <Box>
  <Button
    onClick={(e) => getCoinGeckoInfo()}
    className="col-md-4 offset-md-1"
  >
    Get CoinGeckoInfo{" "}
  </Button>
</Box> */}
          {/* <Box id="wrapper">
        <Box id="first">First</Box>
        <Box id="second">Second</Box>
      </Box> */}
          <Box>
            <Button
              variant={"contained"}
              onClick={(e) => getAllData()}
              style={{
                backgroundColor: "rgb(106, 160, 182)",
                border: "1px solid",
              }}
              /* className="col-md-4 offset-md-1 btn" */
            >
              Fetch your portfolio Data
            </Button>
          </Box>
          <Box>
            <Typography>
              {" "}
              <Link to="/Transak">
                <Button id="pointer" variant={"contained"}>
                  Buy Here{" "}
                </Button>
              </Link>
              &nbsp; Missing some ERC20's in your wallet that you would like to
              add?
            </Typography>
          </Box>{" "}
          <h3 /* className="col-md-4 offset-md-1 " */>
            All ERC20 Tokens you hold!
          </h3>
          {data !== null && (
            <Box>
              {finalObject.map((index) => {
                return (
                  <Box
                    key={index.symbol}
                    /* className="col-md-4 offset-md-1 " */
                    style={{
                      border: " 1px solid rgba(0, 0, 0, .5)",
                      marginBottom: "6vh",
                      backgroundColor: "white",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <Box>
                      <Box>
                        <img
                          alt="logo"
                          src={index.logo}
                          style={{ width: "4vw" }}
                        ></img>

                        {index.name}
                        {index.marketCap !== "No information available" && (
                          <Box /* className="d-flex justify-content-end" */>
                            Get Data feeds! &nbsp;
                            <Button
                              variant={"contained"}
                              /* className="btn" */
                              style={{
                                backgroundColor: "rgb(106, 160, 182)",
                                border: "1px solid",
                              }}
                              onClick={() => generatingHistoryStats(index)}
                            >
                              Click here
                            </Button>
                          </Box>
                        )}
                      </Box>

                      <Box>{index.symbol}</Box>

                      <Box>{index.price} USD</Box>
                      <Box>You own: {index.balance} tokens</Box>
                      <Box>
                        Your Tokens are currently worth: {index.holderValue} USD
                      </Box>
                      <Box>Market Cap: {index.marketCap} USD</Box>
                      <Box>Volume 24h: {index.volume}</Box>
                      {index.priceChange >= 0 && (
                        <Box>
                          Price 24h{" "}
                          <span style={{ color: "green" }}>
                            {index.priceChange} %
                          </span>
                        </Box>
                      )}
                      {index.priceChange < 0 && (
                        <Box>
                          Price 24h{" "}
                          <span style={{ color: "red" }}>
                            {index.priceChange} %
                          </span>
                        </Box>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
        <Box
          component={"p"}
          variant={"p"}
          className="second"
          /*  style={{ width: "50%" }} */
        >
          <Box
          /* className="col-md-3 offset-md-7 graph position-fixed" */
          >
            <input
              type="radio"
              name="dayInterval"
              onChange={() => changeDayInterval(7)}
            ></input>
            7 days &nbsp;
            <input
              type="radio"
              name="dayInterval"
              onChange={() => changeDayInterval(14)}
            ></input>
            14 days &nbsp;
            <input
              type="radio"
              name="dayInterval"
              onChange={() => changeDayInterval(30)}
            ></input>
            30 days &nbsp;
          </Box>
          <Box
            style={{ marginTop: "0vh", width: "80%" /* , height: "80%"  */ }}
          >
            <Box
            /*  className="col-md-3 offset-md-7 graph position-fixed " */
            >
              <Line data={chartDataPrice}></Line>
            </Box>

            <Box
            /*  className="col-md-3 offset-md-7 graph position-fixed" */
            /* style={{ marginTop: "27vh" }} */
            >
              <Line
                data={chartDataVolume}
                options={{ maintainAspectRation: false }}
              ></Line>
            </Box>

            <Box
            /* className="col-md-3 offset-md-7 graph position-fixed" */
            /*  style={{ marginTop: "52vh" }} */
            >
              <Line
                data={chartDataMarketCap}
                options={{ maintainAspectRation: false }}
              ></Line>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
