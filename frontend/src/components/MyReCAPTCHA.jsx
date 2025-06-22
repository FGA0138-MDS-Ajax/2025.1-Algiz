import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const MyReCAPTCHA = ({ onChange }) => {
  return (
    <ReCAPTCHA
      sitekey="6Ld7BGkrAAAAAAupabN5zNTQbgn2J6WhFBCa1uQN" // 🔐 Replace with your actual site key
      onChange={onChange}
    />
  );
};

export default MyReCAPTCHA;

