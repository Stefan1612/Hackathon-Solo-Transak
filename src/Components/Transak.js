import React from "react";
import transakSDK from "@transak/transak-sdk";
const Transak = () => {
  let transak = new transakSDK({
    apiKey:
      "1a1f680f-b867-4f34-911a-b2bda3da1bca" /* process.env.REACT_APP_API_KEY_TRANSAK */, // Your API Key
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
  });

  ///////////////////
  /* ${ process.env.REACT_APP_API_KEY_TRANSAK } */
  ////////////////////////////

  return (
    <div>
      Transak
      {/*  <div>
        <iframe
          height="625"
          title="Transak On/Off Ramp Widget"
          src={`https://staging-global.transak.com?apiKey=1a1f680f-b867-4f34-911a-b2bda3da1bca&cryptoCurrencyCode=DAI`}
          frameborder="no"
          allowtransparency="true"
          allowfullscreen=""
          style={{
            display: "block",
            width: "100%",
            maxHeight: "625px",
            maxWidth: "500px",
          }}
        ></iframe>
      </div> */}
      <button
        style={{ marginTop: "30vh", textAlign: "center", marginLeft: "20vw" }}
        onClick={(e) => startTransak()}
      >
        Open transak
      </button>
    </div>
  );
};

export default Transak;
