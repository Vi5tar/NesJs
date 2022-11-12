import '../styles/globals.css'
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [connectedWallet, setConnectedWallet] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedWallet(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return <Component {...pageProps} connectedWallet={connectedWallet} connectWallet={connectWallet}/>
}

export default MyApp
