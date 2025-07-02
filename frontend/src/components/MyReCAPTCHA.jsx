import React from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";

const MyReCAPTCHA = ({ onChange }) => {
  return (
    <ReCAPTCHA
      sitekey="6Lddw2krAAAAAG5ADGK1oxZs43VDWs0DtZWMWfWf" // 🔐 Replace with your actual site key
      onChange={onChange}
    />
  );
};
MyReCAPTCHA.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default MyReCAPTCHA;