const express = require("express");
const KRRouter = express.Router();
const KRController = require("../controllers/kr.controller");
const validateMiddleware = require("../middleware/validate.middleware");
const KRMiddleware = require("../middleware/kr.middleware");

KRRouter.post(
  "/",
  validateMiddleware.checkEmpty,
  KRMiddleware.checkRequire,
  KRController.create
);
KRRouter.get("/:id", validateMiddleware.checkValidId, KRController.getKRByID);
KRRouter.put(
  "/:id",
  validateMiddleware.checkValidId,
  validateMiddleware.checkEmpty,
  KRController.update
);
KRRouter.delete("/:id", validateMiddleware.checkValidId, KRController.delete);
module.exports = KRRouter;
