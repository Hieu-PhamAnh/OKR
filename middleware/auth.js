const jwt = require("jsonwebtoken");
const { spawnToken } = require("../service/auth.service");
const authMiddleware = {
  verifiyToken: (req, res, next) => {
    const auth = req.headers.authorization;
    const accessToken = auth.split(" ")[1];
    try {
      const payload = jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS);
      req.body.id_verify = payload._id;
      // console.log(req.body);
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({
          message: "Access token hết hạn",
          error: error,
        });
      }
      return res.status(403).json({
        message: "Access token không hợp lệ",
        error: error,
      });
    }
  },
  checkRequired: (req, res, next) => {
    if (!("authorization" in req.headers)) {
      return res.status(401).json({
        message: "Request thiếu token - headers không có trường authorization",
      });
    }
    // if (!req.headers.authorization) {
    //   return res.status(401).json({
    //     message: "Request thiếu token - authoraztion rỗng",
    //   });
    // }
    next();
  },
};

module.exports = authMiddleware;
