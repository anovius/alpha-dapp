import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../views/DappGate";
import "../views/DappGate.css";

export const ConnectionButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            className="page-button themebutton button connectbutton"
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "cursor",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="hidden connectbutton"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="connectbutton"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="connectedbutton">
                  <button
                    onClick={openChainModal}
                    // style={{ display: 'flex', alignItems: 'center' }}
                    type="button "
                    className="hidden chainbutton connectbutton"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="connectbutton"
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
