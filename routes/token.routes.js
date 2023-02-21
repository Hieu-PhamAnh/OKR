const express = require("express");
const { refreshToken } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");
const authRouter = express.Router();

// authRouter.post("/refresh-token", authMiddleware.checkRequired, refreshToken);
authRouter.post("/refresh-token", authMiddleware.checkRequired, refreshToken);

module.exports = authRouter;
