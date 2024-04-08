import React, { useState } from "react";
import PropTypes from "prop-types";

import { bridgeSwap } from "./drop";

import "../Airdrop.css";

const Zkdrop = (props: any) => {
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("Collect");

  return (
    <div className={`component1-container ${props.rootClassName} `}>
      <button
        onClick={() => {
          if (running === false) {
            setRunning(true);
            (async () => {
              try {
                await bridgeSwap(setStatus);
              } catch (e) {
                console.log(e);
                setStatus("Error encountered");
              }

              setRunning(false);
            })();
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

Zkdrop.defaultProps = {
  rootClassName: "",
};

Zkdrop.propTypes = {
  rootClassName: PropTypes.string,
};

export default Zkdrop;
