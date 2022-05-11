import { Line, Pie, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import React, { useState, useEffect } from "react";
import logo from "../LogoMakr-1ceYNX.png";
import Navbar from "./Navbar";

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
}) => {
  //if you dont hold any tokens
  {
    /*if(areTokensFetched == true && finalObject.length <= 1){
      return(<div className="pages " style={{height: "100vh"}}>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
  
      <Navbar account={account} networkName={network.name} networkChainId={network.chainId} udLoginDomain={udLoginDomain}/>
    <h1 className="text-center" style={{paddingTop: "30vh"}}>
        It seems Like you do not own any ERC20 yet!
      </h1>
      <footer id="footer" className="fixed-bottom" style={{marginTop: "10vh"}}>
        <i className="fab fa-github">&nbsp;&nbsp;&nbsp; </i>
        <i className="fab fa-twitter">&nbsp;&nbsp;&nbsp;  </i> 
            <i className="fab fa-discord">&nbsp;&nbsp;&nbsp;</i>
            <i className="fab fa-linkedin-in">&nbsp;&nbsp;&nbsp;</i>
            <i className="fab fa-youtube">&nbsp;&nbsp;&nbsp;</i>
            <button className="pointer UDButtonLogOut"style={{marginLeft: "30vw"}}onClick={handleLogoutButtonClick}>Logout</button>
        </footer>
    </div>)
    }*/
  }
  return (
    <div>
      <h1
        className="d-flex justify-content-center"
        style={{ paddingTop: "6vh" }}
      >
        {portfolioBalance} USD
      </h1>
      <button
        className="btn btn-danger offset-md-1"
        style={{ fontSize: "70%" }}
        onClick={() => getTokens()}
      >
        Refetch
      </button>
      <div className="col-md-4 offset-md-1" style={{ fontSize: "70%" }}>
        Refetch Portfolio in case Moralis or CoinGeckos API has issues and You
        can not see your Data instantly
      </div>
      {/* <div>
  <button
    onClick={(e) => getCoinGeckoInfo()}
    className="col-md-4 offset-md-1"
  >
    Get CoinGeckoInfo{" "}
  </button>
</div> */}
      <div>
        <button
          onClick={(e) => getAllData()}
          style={{
            backgroundColor: "rgb(106, 160, 182)",
            border: "1px solid",
          }}
          className="col-md-4 offset-md-1 btn"
        >
          Get CoinGeckoInfo, Second option
        </button>
      </div>
      <div className="col-md-3 offset-md-7 graph position-fixed">
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
      </div>

      <div
        className="col-md-3 offset-md-7 graph position-fixed "
        style={{ marginTop: "2vh" }}
      >
        <Line data={chartDataPrice}></Line>
      </div>

      <div
        className="col-md-3 offset-md-7 graph position-fixed"
        style={{ marginTop: "27vh" }}
      >
        <Line
          data={chartDataVolume}
          options={{ maintainAspectRation: false }}
        ></Line>
      </div>

      <div
        className="col-md-3 offset-md-7 graph position-fixed"
        style={{ marginTop: "52vh" }}
      >
        <Line
          data={chartDataMarketCap}
          options={{ maintainAspectRation: false }}
        ></Line>
      </div>

      <h3 className="col-md-4 offset-md-1 ">All ERC20 Tokens you hold!</h3>
      {data !== null && (
        <div>
          {finalObject.map((index) => {
            return (
              <div
                key={index.symbol}
                className="col-md-4 offset-md-1 "
                style={{
                  border: " 1px solid rgba(0, 0, 0, .5)",
                  marginBottom: "6vh",
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <div>
                  <div>
                    <img
                      alt="logo"
                      src={index.logo}
                      style={{ width: "4vw" }}
                    ></img>

                    {index.name}
                    {index.marketCap !== "No information available" && (
                      <div className="d-flex justify-content-end">
                        Get Data feeds! &nbsp;
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "rgb(106, 160, 182)",
                            border: "1px solid",
                          }}
                          onClick={() => generatingHistoryStats(index)}
                        >
                          Click here
                        </button>
                      </div>
                    )}
                  </div>

                  <div>{index.symbol}</div>

                  <div>{index.price} USD</div>
                  <div>You own: {index.balance} tokens</div>
                  <div>
                    Your Tokens are currently worth: {index.holderValue} USD
                  </div>
                  <div>Market Cap: {index.marketCap} USD</div>
                  <div>Volume 24h: {index.volume}</div>
                  {index.priceChange >= 0 && (
                    <div>
                      Price 24h{" "}
                      <span style={{ color: "green" }}>
                        {index.priceChange} %
                      </span>
                    </div>
                  )}
                  {index.priceChange < 0 && (
                    <div>
                      Price 24h{" "}
                      <span style={{ color: "red" }}>
                        {index.priceChange} %
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
