import React, { useState } from "react";
import PropTypes from "prop-types";
import { ethers, utils } from "ethers";
import { EthBridger, getL2Network } from "@arbitrum/sdk";

import erc20_abi from "../../abis/erc20.json";
import reader_abi from "../../abis/reader.json";
import router_abi from "../../abis/router.json";
import straddle_abi from "../../abis/straddle.json";

import "../Airdrop.css";

const Arbdrop = (props) => {
  const l1ToL2Amount = "0.003";
  const ethToDaiAmount = "0.001";
  const usdcToEthStraddleAmount = "1.000001";
  const gmxVaultAddress = "0x489ee077994B6658eAfA855C308275EAd8097C4A";
  const gmxReaderAddress = "0x22199a49A999c351eF7927602CFB187ec3cae489";
  const gmxRouterAddress = "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064";
  const wethContractAddress = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
  const daiContractAddress = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
  const usdcContractAddress = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8";
  const ethStraddleAddress = "0xfca313e2be55957AC628a6193A60D38aDC2da64E";

  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("Collect");

  const moveEthToArbitrum = async () => {
    const l1Provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    await l1Provider.send("eth_requestAccounts", []);

    const { chainId } = await l1Provider.getNetwork();
    if (chainId !== 1) {
      await l1Provider.send("wallet_switchEthereumChain", [
        {
          chainId: "0x1",
        },
      ]);
    }

    const l1Signer = l1Provider.getSigner();
    const l2Provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/arbitrum"
    );
    const l2Network = await getL2Network(l2Provider);
    const ethBridger = new EthBridger(l2Network);

    setStatus("Bridging ETH to Arbitrum");
    const ethDepositTxResponse = await ethBridger.deposit({
      amount: utils.parseEther(l1ToL2Amount),
      l1Signer: l1Signer,
    });
    setStatus("Waiting for bridge completion");
    const depositTx = await ethDepositTxResponse.wait();
    setStatus("Waiting for L2 confirmation");
    await depositTx.waitForL2(l2Provider);
    setStatus("Sleeping for 2.5 minutes");
    await new Promise((resolve) => setTimeout(resolve, 150000));
  };

  const swapETHToUSDC = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const { chainId } = await provider.getNetwork();
    if (chainId !== 42161) {
      await provider.send("wallet_switchEthereumChain", [
        {
          chainId: "0xa4b1",
        },
      ]);
    }
    const signer = provider.getSigner();

    const ReaderContract = new ethers.Contract(
      gmxReaderAddress,
      reader_abi.abi
    );
    const RouterContract = new ethers.Contract(
      gmxRouterAddress,
      router_abi.abi
    );
    const DAIContract = new ethers.Contract(daiContractAddress, erc20_abi.abi);

    const [outAmount] = await ReaderContract.connect(signer).getAmountOut(
      gmxVaultAddress,
      wethContractAddress,
      daiContractAddress,
      utils.parseEther(ethToDaiAmount)
    );
    const minOutAmount = outAmount.mul(95).div(100).toString();

    setStatus("Swapping ETH to DAI");
    const swapTx = await RouterContract.connect(signer).swapETHToTokens(
      [wethContractAddress, daiContractAddress],
      minOutAmount,
      await signer.getAddress(),
      {
        value: utils.parseEther(ethToDaiAmount),
      }
    );
    await swapTx.wait();

    setStatus("Approving DAI");
    const zeroXAPIResponse = await (
      await fetch(
        `https://arbitrum.api.0x.org/swap/v1/quote?buyToken=${usdcContractAddress}&sellToken=${daiContractAddress}&sellAmount=${minOutAmount}&slippagePercentage=0.1`
      )
    ).json();

    const allowance = await DAIContract.connect(signer).allowance(
      await signer.getAddress(),
      zeroXAPIResponse.allowanceTarget
    );

    if (allowance.lt(minOutAmount)) {
      const approveTx = await DAIContract.connect(signer).approve(
        zeroXAPIResponse.allowanceTarget,
        ethers.constants.MaxUint256
      );
      await approveTx.wait();
    }

    setStatus("Swapping DAI to USDC");
    const swapTx2 = await signer.sendTransaction({
      to: zeroXAPIResponse.to,
      data: zeroXAPIResponse.data,
      value: zeroXAPIResponse.value,
    });

    setStatus("Waiting for DAI-USDC swap");
    await swapTx2.wait();
  };

  const depositUSDCToEthStraddle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const { chainId } = await provider.getNetwork();
    if (chainId !== 42161) {
      await provider.send("wallet_switchEthereumChain", [
        {
          chainId: "0xa4b1",
        },
      ]);
    }
    const signer = provider.getSigner();

    const StraddleContract = new ethers.Contract(
      ethStraddleAddress,
      straddle_abi.abi
    );
    const USDCContract = new ethers.Contract(
      usdcContractAddress,
      erc20_abi.abi
    );

    setStatus("Approving USDC");
    const allowance = await USDCContract.connect(signer).allowance(
      await signer.getAddress(),
      ethStraddleAddress
    );

    if (allowance.lt(utils.parseUnits(usdcToEthStraddleAmount, 6))) {
      const approveTx = await USDCContract.connect(signer).approve(
        ethStraddleAddress,
        ethers.constants.MaxUint256
      );
      await approveTx.wait();
    }

    setStatus("Depositing USDC to EthStraddle");
    const depositTx = await StraddleContract.connect(signer).deposit(
      utils.parseUnits(usdcToEthStraddleAmount, 6),
      false,
      await signer.getAddress()
    );
    setStatus("Waiting for deposit completion");
    await depositTx.wait();
    setStatus("Deposit complete");
  };

  const arbdrop = async () => {
    try {
      setStatus("Started");
      await moveEthToArbitrum();
      await swapETHToUSDC();
      await depositUSDCToEthStraddle();
      setStatus("Finished");
    } catch (error) {
      setStatus("Error encountered");
      console.log(error);
    }
    setRunning(false);
  };

  return (
    <div className={`component1-container ${props.rootClassName} `}>
      <button
        onClick={() => {
          if (running === false) {
            setRunning(true);
            arbdrop();
          } else {
            alert("Cannot run multiple times");
          }
        }}
        className="component1-button themebutton button"
      >
        <div className="component1-button-wrapper">
          {running && <div className="component1-button-loader"></div>}
          <div>{status}</div>
        </div>
      </button>
    </div>
  );
};

Arbdrop.defaultProps = {
  rootClassName: "",
};

Arbdrop.propTypes = {
  rootClassName: PropTypes.string,
};

export default Arbdrop;
