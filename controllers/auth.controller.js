const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const User = require("../models/User");
const { spawnToken } = require("../service/auth.service");

const refreshToken = async (req, res) => {
  const auth = req.headers.authorization;
  const refreshToken = auth.split(" ")[1];
  const checkDB = await Token.findOne({ token: refreshToken });
  if (!checkDB) {
    return res.status(401).json({
      message: "Refresh token không tồn tại trong database",
    });
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
    const user = await User.findOne({ _id: payload._id });
    const token = await spawnToken(user);
    checkDB.token = token.refreshToken;
    await checkDB.save();
    return res.status(200).json({
      data: token,
      // access_token: token.accessToken,
      // expriseAt: token.expriseAt,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      await checkDB.delete();
      return res.status(403).json({
        message: "Refresh token hết hạn",
        error: error,
      });
    }
    return res.status(401).json({
      message: "Refresh Token không hợp lệ",
      error: error,
    });
  }
};

module.exports = { refreshToken };
