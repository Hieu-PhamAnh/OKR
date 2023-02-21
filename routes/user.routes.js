const express = require("express");
const userRouter = express.Router();
const validateMiddleware = require("../middleware/validate.middleware");
const userMiddleware = require("../middleware/user.middleware");
const authMiddleware = require("../middleware/auth");
const userController = require("../controllers/user.controller");

userRouter.post(
  "/",
  validateMiddleware.checkEmpty,
  userMiddleware.checkRequired,
  userMiddleware.checkExist,
  userMiddleware.checkValid,
  userController.create
);
userRouter.get(
  "/:id",
  authMiddleware.checkRequired,
  authMiddleware.verifiyToken,
  validateMiddleware.checkValidId,
  validateMiddleware.checkValidIdUser,
  userController.getUserByID
);
userRouter.get(
  "/:id/objectives",
  authMiddleware.checkRequired,
  authMiddleware.verifiyToken,
  validateMiddleware.checkValidId,
  validateMiddleware.checkValidIdUser,
  validateMiddleware.checkQuerry,
  userController.getObjByUserID
);
userRouter.put(
  "/:id",
  authMiddleware.checkRequired,
  authMiddleware.verifiyToken,
  validateMiddleware.checkEmpty,
  validateMiddleware.checkValidId,
  validateMiddleware.checkValidIdUser,
  userMiddleware.checkUpdate,
  userController.update
);
// userRouter.delete(
//   "/:id",
//   authMiddleware.checkRequired,
//   authMiddleware.verifiyToken,
//   validateMiddleware.checkValidId,
//   userController.delete
// );
userRouter.post(
  "/login",
  validateMiddleware.checkEmpty,
  userMiddleware.checkRequiredLogin,
  userController.login
);
// userRouter.get("/getObj/:id", userController.getObjByUserID);

module.exports = userRouter;
