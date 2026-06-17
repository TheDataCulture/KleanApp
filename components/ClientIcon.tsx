import React from "react";
import Svg, { Path } from "react-native-svg";

const ClientIcon = () => {
  return (
    <Svg
      width="64"
      height="65"
      viewBox="0 0 64 65"
      fill="none"
    >
      <Path
        opacity="0.4"
        d="M32.4307 29.4893C32.1641 29.4626 31.8441 29.4626 31.5507 29.4893C25.2041 29.2759 20.1641 24.0759 20.1641 17.6759C20.1641 11.1426 25.4441 5.83594 32.0041 5.83594C38.5374 5.83594 43.8441 11.1426 43.8441 17.6759C43.8174 24.0759 38.7774 29.2759 32.4307 29.4893Z"
        stroke="#1B1B1B"
        strokeWidth={4}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.09 39.3241C12.6367 43.6441 12.6367 50.6841 19.09 54.9774C26.4233 59.8841 38.45 59.8841 45.7833 54.9774C52.2367 50.6574 52.2367 43.6174 45.7833 39.3241C38.4767 34.4441 26.45 34.4441 19.09 39.3241Z"
        stroke="#1B1B1B"
        strokeWidth={4}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ClientIcon;
