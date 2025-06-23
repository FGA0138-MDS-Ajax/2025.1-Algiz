import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const MyReCAPTCHA = ({ onChange }) => {
  return (
    <ReCAPTCHA
      sitekey="6Lddw2krAAAAAG5ADGK1oxZs43VDWs0DtZWMWfWf" // 🔐 Replace with your actual site key
      onChange={onChange}
    />
  );
};

export default MyReCAPTCHA;