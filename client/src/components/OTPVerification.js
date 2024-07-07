import React, { useState } from 'react';

function OTPVerification({ onVerify }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button type="submit" className="btn btn-block">Verify OTP</button>
    </form>
  );
}

export default OTPVerification;