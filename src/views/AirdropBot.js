import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

import { Helmet } from "react-helmet";
import Arbdrop from "../components/Arbdrop/Arbdrop";
import Metadrop from "../components/Metadrop/Metadrop";
import ZKdrop from "../components/Zkdrop/Zkdrop";

import "./AirdropBot.css";

const AirdropBot = (props) => {
	let navigate = useNavigate();
	const { address, isConnected } = useAccount();

	let copyRightYear = "alfa.society " + new Date().getFullYear();

	// useEffect(() => {
	//   // Redirect to homepage if not connected
	//   if (!isConnected) {
	//     navigate("/");
	//   }
	// }, [isConnected, navigate]);

	return (
		<div className="home-container">
			<Helmet>
				<title>alfa dapp</title>
				<meta property="og:title" content="alfa dapp" />
			</Helmet>
			<section className="home-hero">
				<div className="home-menu">
					<div className="home-desktop-navigation">
						<nav className="home-centered">
							<div className="home-left">
								<a href="http://alfasociety.io/">
									<img alt="pastedImage" src="/playground_assets/alfa_logo-1500h.png" className="home-logo1" />
								</a>
								<div className="home-links1">
									<span className="home-text03 Link active">alfa.airdropbot</span>
									<span className="home-text04 Link ">alfa.walletduster</span>
								</div>
							</div>
							<div onClick={() => navigate("/")} className="home-right">
								<div id="open-mobile-menu" className="home-burger-menu"></div>
								<div className="home-container1">
									<span className="home-text05 Link">{address?.slice(0, 10)}...</span>
								</div>
								<svg viewBox="0 0 877.7142857142857 1024" className="home-icon02" onClick={() => navigate("/")}>
									<path d="M877.714 512c0 241.714-197.143 438.857-438.857 438.857s-438.857-197.143-438.857-438.857c0-138.857 64-266.857 175.429-350.286 32.571-24.571 78.286-18.286 102.286 14.286 24.571 32 17.714 78.286-14.286 102.286-74.286 56-117.143 141.143-117.143 233.714 0 161.143 131.429 292.571 292.571 292.571s292.571-131.429 292.571-292.571c0-92.571-42.857-177.714-117.143-233.714-32-24-38.857-70.286-14.286-102.286 24-32.571 70.286-38.857 102.286-14.286 111.429 83.429 175.429 211.429 175.429 350.286zM512 73.143v365.714c0 40-33.143 73.143-73.143 73.143s-73.143-33.143-73.143-73.143v-365.714c0-40 33.143-73.143 73.143-73.143s73.143 33.143 73.143 73.143z"></path>
								</svg>
							</div>
						</nav>
					</div>
					<div></div>
				</div>
				<div className="home-container2">
					<div className="home-links2">
						<span className="active home-text06">alfa.airdropbot</span>
						<span className="home-text07">alfa.walletduster</span>
					</div>
				</div>
				<div className="home-cards">
					<div className="home-container3">
						<div className="inactive-airdrop-bot-card card">
							<img
								alt="pastedImage"
								src="/playground_assets/arbitrum_symbol-full-color-white-background-200w.png"
								className="home-icon04"
							/>
							<span className="home-text08">Arbitrum</span>
							<span className="home-text09">
								The Arbitrum network is a layer-2 functionality, developed by the New York-based company Offchain Labs,
								which seeks to solve the congestion that the Ethereum network has been experiencing by improving how
								smart contracts are validated.
							</span>
							<div className="airdropLinks">
								<a href="https://arbitrum.io/" target="_blank" rel="noreferrer noopener" className="airdropLink">
									More info
								</a>
								<a
									href="https://3053004074-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fus2iMTHQw8b5HBPiAvSZ%2Fuploads%2FKH77qAcR9qm81ZdcgobH%2Falfa.airdropbot_arbitrum_instructions.pdf?alt=media&token=3740f5d2-e0ea-46be-81e3-db78d78e02ad"
									target="_blank"
									rel="noreferrer noopener"
									className="airdropLink">
									Instructions
								</a>
							</div>
							{/* <Arbdrop rootClassName="component1-root-class-name"></Arbdrop> */}
						</div>
						<div className="inactive-airdrop-bot-card card">
							<img
								alt="pastedImage"
								src="/playground_assets/layerzero_symbol-full-color-white-background-200w.png"
								className="home-icon04"
							/>
							<span className="home-text08">LayerZero</span>
							<span className="home-text09">
								LayerZero is an omnichain interoperability protocol designed for lightweight message passing across
								chains. LayerZero provides authentic and guaranteed message delivery with configurable trustlessness.{" "}
							</span>
							<div className="airdropLinks">
								<a href="https://layerzero.network/" target="_blank" rel="noreferrer noopener" className="airdropLink">
									More info
								</a>
								{/* <a
                  href="https://3053004074-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fus2iMTHQw8b5HBPiAvSZ%2Fuploads%2FKH77qAcR9qm81ZdcgobH%2Falfa.airdropbot_arbitrum_instructions.pdf?alt=media&token=3740f5d2-e0ea-46be-81e3-db78d78e02ad"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="airdropLink"
                >
                  Instructions
                </a> */}
							</div>
							{/* <Arbdrop rootClassName="component1-root-class-name"></Arbdrop> */}
						</div>
					</div>
					<div className="home-container4">
						<div className="inactive-airdrop-bot-card card">
							<img
								alt="pastedImage"
								src="/playground_assets/metamask_fox.svg%20%5B1%5D-200h.png"
								className="home-icon06"
							/>
							<span className="home-text16">Metamask</span>
							<span className="home-text17">
								Available as a browser extension and as a mobile app, MetaMask equips you with a key vault, secure
								login, token wallet, and token exchange—everything you need to manage your digital assets. MetaMask
								provides the simplest yet most secure way...
							</span>
							<div className="airdropLinks">
								<a href="https://metamask.io/" target="_blank" rel="noreferrer noopener" className="airdropLink">
									More info
								</a>
								<a
									href="https://3053004074-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fus2iMTHQw8b5HBPiAvSZ%2Fuploads%2FpxDLe4cO8B9gQrurkIQb%2Falfa.airdropbot_metamask_instructions.pdf?alt=media&token=2a95dc01-9c43-40a4-8421-5323744aaf24"
									target="_blank"
									rel="noreferrer noopener"
									className="airdropLink">
									Instructions
								</a>
							</div>
							{/* <Metadrop rootClassName="component1-root-class-name"></Metadrop> */}
						</div>
						<div className="inactive-airdrop-bot-card card">
							<img alt="pastedImage" src="/playground_assets/logo-no-letters.svg" className="home-icon07" />
							<span className="home-text18">zkSYNC</span>
							<span className="home-text19">
								zkSync is built on ZK Rollup architecture. ZK Rollup is an L2 scaling solution in which all funds are
								held by a smart contract on the mainchain, while computation and storage are performed off-chain. For
								every Rollup block, a state transition zero-knowledge proo...
							</span>
							<div className="airdropLinks">
								<a href="https://zksync.io/" target="_blank" rel="noreferrer noopener" className="airdropLink">
									More info
								</a>
								<a
									href="https://3053004074-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fus2iMTHQw8b5HBPiAvSZ%2Fuploads%2FBffaN4ewyJfcB4v2EaIx%2Falfa.airdropbot_zksync_instructions.pdf?alt=media&token=81a699a3-694d-4de9-92f8-a627488e7f51"
									target="_blank"
									rel="noreferrer noopener"
									className="airdropLink">
									Instructions
								</a>
							</div>
							<ZKdrop rootClassName="component1-root-class-name" />
						</div>
					</div>
					<div className="home-container3">
						<div className="inactive-airdrop-bot-card card">
							<img alt="pastedImage" src="/playground_assets/optimism.caeb9392.svg" className="home-icon05" />
							<span className="home-text10">Optimism 2nd airdrop</span>
							<span className="home-text11">
								<span className="home-text12">
									Optimism is an Ethereum Layer 2 scaling solution powered by a technology called Optimistic rollups,
									designed to utilize the strong security guarantees of Ethereum while reducing its cost and latency.
								</span>
								<br></br>
								<span>The Optimism Foundation will distribute...</span>
								<br></br>
							</span>
							<a href="https://www.optimism.io/" target="_blank" rel="noreferrer noopener" className="home-link1 Link">
								More info
							</a>
						</div>
					</div>
				</div>
			</section>
			<section className="home-action-bar">
				<footer className="home-learn-more">
					<div className="home-banner">
						<h2 className="home-text20">
							<span>Learn more about alfa.dapp</span>
							<br className="home-text22"></br>
							<span>
								<span
									dangerouslySetInnerHTML={{
										__html: " ",
									}}
								/>
							</span>
						</h2>
						<div className="home-container6">
							<a
								href="https://alfa-society.gitbook.io/"
								target="_blank"
								rel="noreferrer noopener"
								className="home-link4 themebutton button">
								Knowledgebase
							</a>
						</div>
					</div>
				</footer>
			</section>
			<section className="home-action-bar1">
				<footer className="home-footer">
					<a href="https://www.alfasociety.io/">
						<img alt="logo" src="/playground_assets/alfa_logo-1500h.png" className="home-image" />
					</a>
					<div className="home-container7">
						<span className="home-text24">Copyright © {copyRightYear}</span>
					</div>
					<div className="home-icon-group">
						<a href="https://t.me/AlfaSociety" target="_blank" rel="noreferrer noopener" className="home-link5">
							<svg viewBox="0 0 1024 1024" className="home-icon08">
								<path d="M679.429 746.857l84-396c7.429-34.857-12.571-48.571-35.429-40l-493.714 190.286c-33.714 13.143-33.143 32-5.714 40.571l126.286 39.429 293.143-184.571c13.714-9.143 26.286-4 16 5.143l-237.143 214.286-9.143 130.286c13.143 0 18.857-5.714 25.714-12.571l61.714-59.429 128 94.286c23.429 13.143 40 6.286 46.286-21.714zM1024 512c0 282.857-229.143 512-512 512s-512-229.143-512-512 229.143-512 512-512 512 229.143 512 512z"></path>
							</svg>
						</a>
						<a
							href="https://twitter.com/alfasocietyERC"
							target="_blank"
							rel="noreferrer noopener"
							className="home-link6">
							<svg viewBox="0 0 950.8571428571428 1024" className="home-icon10">
								<path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
							</svg>
						</a>
					</div>
				</footer>
			</section>
		</div>
	);
};

export default AirdropBot;
