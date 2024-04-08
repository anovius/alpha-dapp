import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useContractRead, useAccount } from "wagmi";
import CONTRACT_ABI from "../abis/abi.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ConnectionButton } from "../components/ConnectButton";
import "./DappGate.css";

const DappGate = (props) => {
	let navigate = useNavigate();

	const { address, isConnected } = useAccount();
	const [wl, setWl] = useState([]);

	// fetch google sheets data
	useEffect(() => {
		Papa.parse(
			"https://docs.google.com/spreadsheets/d/e/2PACX-1vTOLiJC_tIwGjNwIhi7is89jMStUF7ZEXbqRoZynngsqdbxzG8O3APj14gXd_E6f-UBVCpyiCt_rGbe/pub?gid=0&single=true&output=csv",
			{
				download: true,
				header: true,
				complete: function (results) {
					// console.log(results.data);
					const wallets = results.data.map((row) => row["Wallet Addresses"]); // now using the named column header directly
					const validWallets = wallets.filter((wallet) => wallet); // this will remove any undefined or empty values
					setWl([
						...validWallets,
						"0x38DEcb32B9081835B0a308292ebf93cf7f8443E6",
						"0xAd98Da8b66b7B929ab84a855602277BF11792CA2",
						"0x97351a94a5a28f176cFA16E104237c622a7c5a59",
						"0x64adbB2d40c57b94DC54692A61d28A49B098AA7D"
					]);
				},
			}
		);
	}, []);

	// $ALFA Token contract address
	const ALFA_CONTRACT_ADDRESS = "0x128ad1ad707c3B36e6F2ac9739f9dF7516FdB592";
	//ALphawolves NFT contract address
	const A_WOLVES_CONTRACT_ADDRESS = "0xdcd6d4a557ff208f01D4c2b5Bf829078622C37c5";

	const { data: balanceOfCheck } = useContractRead({
		address: ALFA_CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: "balanceOf",
		args: [address],
	});

	const { data: balanceOfCheck2 } = useContractRead({
		address: A_WOLVES_CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: "balanceOf",
		args: [address],
	});

	// console.log(balanceOfCheck, "$ALFA Token balance");
	// console.log(balanceOfCheck2, "ALphawolves NFT balance");
	// console.log(address, "Connected Wallet address");

	// if user wallet is not connected, this function will be called to the user attention
	let isNotificationVisible = false;

	const connectWalletError = () => {
		if (!isConnected && !isNotificationVisible) {
			isNotificationVisible = true;
			toast.warning("Please connect your wallet first to continue", {
				position: toast.POSITION.TOP_LEFT,
				theme: "dark",
				autoClose: 5000,
				onClose: () => {
					isNotificationVisible = false; // Reset the flag when the notification is closed
				},
			});
		}
	};

	// if user wallet is not in the WL, the warning appears. If they are they proceed to dapp
	let isNotificationVisible2 = false;

	const enterDapp = () => {
		if (!address) {
			// handle case when address is not defined
			return;
		}

		const lowerCaseAddress = address.toLowerCase();
		const lowerCaseWhitelist = wl.map((wallet) => wallet.toLowerCase());

		if (lowerCaseWhitelist.includes(lowerCaseAddress)) {
			localStorage.setItem("isWhitelisted", "true"); // set isWhitelisted flag in localStorage
			navigate("/airdrop-bot");
		} else {
			if (!isNotificationVisible2) {
				isNotificationVisible2 = true;
				toast.warning("Your wallet is not whitelisted. Please proceed by whitelisting your wallet address.", {
					position: toast.POSITION.TOP_CENTER,
					theme: "dark",
					autoClose: 5000,
					onClose: () => {
						isNotificationVisible2 = false; // Reset the flag when the notification is closed
					},
				});
			}
		}
	};

	return (
		<div className="page-container">
			<Helmet>
				<title>alfa.dapp</title>
				<meta property="og:title" content="alfa.dapp" />
			</Helmet>
			<ConnectionButton></ConnectionButton>
			<div className="page-banner">
				<img src="/playground_assets/dappper.svg" alt="image" className="page-image" />
				<h1 className="page-text">alfa.dapp</h1>
				<span className="page-text1">v1.2</span>
				<span className="page-text2">You need to whitelist your wallet first.</span>
				<a
					href="https://alfasociety.gitbook.io/alfa.society-information-hub/utilities/alfa.airdropbot/whitelisting"
					target="_blank"
					rel="noreferrer noopener"
					className="page-link">
					Whitelist Wallet Address
				</a>
				<button
					className="page-button1 themebutton button hover-white"
					onClick={!isConnected ? connectWalletError : enterDapp}>
					enter dapp
				</button>
			</div>
		</div>
	);
};

export default DappGate;
