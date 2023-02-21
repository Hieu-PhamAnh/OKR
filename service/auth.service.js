const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");

const spawnToken = async (user) => {
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.SECRET_KEY_ACCESS,
    { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRE || 10) * 60 }
  );
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.SECRET_KEY_REFRESH,
    // 5
    { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRE || 10) * 60 }
  );
  let token = {
    accessToken: accessToken,
    expriseAt: Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE) * 60 * 1000,
    refreshToken: refreshToken,
    refreshExpriseAt:
      Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE) * 60 * 1000,
  };
  // console.log(token);
  return token;
};

const deleteTokenDB = async (user) => {
  const token = await Token.findOne({ userID: user._id });
  if (token) {
    await token.delete();
    // console.log(token);
    // await Token.deleteOne({ userID: user._id });
  }
};

module.exports = { spawnToken, deleteTokenDB };
