import "./App.css";
import { useMemo } from "react";
import splash from './homelogo.png';
import roadmap from './roadmap.jpg';
import preview from './preview.png';
import anatomy from './anatomy.png';

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme} from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <div className="social-icons">
              <a href="https://twitter.com/tojibaceo" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://discord.gg/NuUDNKkgXX" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            
            <p className="text-secondary-color">
            <p>Supply=2222  Price=0.22 Solana</p>
            <img  src={splash} alt="splash" className="imagess"/>
<p>Here you can mint a unique Toji 100 Personal Computer from the Tojiba CPU Corporation.</p>
<p>Tojiba is your link to the World Wide Web!</p> 
<p>Treat it kindly and it will take you places you could have never imagined!</p> 
<p>Remember to own as many personal computers as possible!</p>
<p>Visit us on <a href="https://twitter.com/tojibaceo" target="_blank" rel="noreferrer">Twitter</a> or  <a href="https://discord.gg/NuUDNKkgXX" target="_blank" rel="noreferrer">Discord</a> for more info!</p>
            </p>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>
 
        <div id="link2" className="container">
        <p className="text-secondary-color">Preview</p>
        <img src={preview} alt="preview" className="images"/>
        <p className="text-secondary-color">Anatomy</p>
        <img  src={anatomy} alt="anatomy" className="images"/>
        <p className="text-secondary-color">Roadmap</p>
        <img  src={roadmap} alt="roadmap" className="images"/>
        </div>
      </div>
    </div>
  );
};

export default App;
