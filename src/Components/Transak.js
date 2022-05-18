import React, { useState } from "react";
import transakSDK from "@transak/transak-sdk";
import axios from "axios";
const Transak = () => {
  const [transakSucceed, setTransakSucceed] = useState(false);
  let transak = new transakSDK({
    apiKey: process.env.REACT_APP_API_KEY_TRANSAK, // Your API Key
    environment: "STAGING", // STAGING/PRODUCTION
    hostURL: window.location.origin,
    widgetHeight: "625px",
    widgetWidth: "500px",
    // Examples of some of the customization parameters you can pass
    defaultCryptoCurrency: "ETH", // Example 'ETH'
    walletAddress: "", // Your customer's wallet address
    themeColor: "#0000ff", // App theme color
    fiatCurrency: "", // If you want to limit fiat selection eg 'USD'
    email: "", // Your customer's email address
    redirectURL: "",
  });

  function startTransak() {
    transak.init();
  }

  // To get all the events
  transak.on(transak.ALL_EVENTS, (data) => {
    console.log(data);
  });

  // This will trigger when the user marks payment is made.
  transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    transak.close();
    setTransakSucceed(true);
  });

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <button
        style={{
          backgroundColor: "rgb(106, 160, 182)",
          border: "1px solid",
          textAlign: "center",
          marginTop: "30vh",
        }}
        onClick={(e) => startTransak()}
      >
        Open transak
      </button>
      <div>
        You can easily buy yourself some crypto using One Click leveraging
        Transak's technology.
      </div>
      {transakSucceed && <div>Succeed</div>}
    </div>
  );
};

export default Transak;
