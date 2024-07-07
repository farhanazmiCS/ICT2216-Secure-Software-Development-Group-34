const OTP = require('../models/OTP');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const saveOTP = async (email) => {
  const otp = generateOTP();
  const otpInstance = new OTP({ email, otp });
  await otpInstance.save();
  return otp;
};

const isValidOTP = async (email, userOTP) => {
    const otpRecord = await OTP.findOne({ email, otp: userOTP });
    if (otpRecord) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return true;
    }
    return false;
  };

module.exports = { generateOTP, saveOTP, isValidOTP };