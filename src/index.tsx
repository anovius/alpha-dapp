import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// --------- WAGMI package importation ---------
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// --------- React Toastify importation ---------
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";
import AirdropBot from "./views/AirdropBot";
import DappGate from "./views/DappGate";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.PROJECT_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "alfa.society",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <Router>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<DappGate />} />
            <Route path="/airdrop-bot" element={<AirdropBot />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
