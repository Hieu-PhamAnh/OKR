const express = require("express");
const objRouter = require("./objective.routes");
const userRouter = require("./user.routes");
const KRRouter = require("./kr.routes");
const tokenRouter = require("./token.routes");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(
  "/objectives",
  authMiddleware.checkRequired,
  authMiddleware.verifiyToken,
  objRouter
);
router.use("/users", userRouter);
router.use(
  "/key-results",
  authMiddleware.checkRequired,
  authMiddleware.verifiyToken,
  KRRouter
);
router.use("/tokens", authMiddleware.checkRequired, tokenRouter);
// router.use("/search");
module.exports = router;
