const express = require("express");
const objRouter = express.Router();
const objController = require("../controllers/objective.controller");
const validateMiddleware = require("../middleware/validate.middleware");
const objMiddleware = require("../middleware/obj.middleware");

objRouter.post(
  "/",
  validateMiddleware.checkEmpty,
  objMiddleware.checkRequired,
  objController.create
);
objRouter.get(
  "/:id",
  validateMiddleware.checkValidId,
  objController.getObjByID
);
objRouter.get(
  "/:id/key-results",
  validateMiddleware.checkValidId,
  validateMiddleware.checkQuerry,
  objController.getAllKRbyOjbID
);
objRouter.put(
  "/:id",
  validateMiddleware.checkValidId,
  validateMiddleware.checkEmpty,
  objMiddleware.checkUpdate,
  objController.update
);
objRouter.delete("/:id", validateMiddleware.checkValidId, objController.delete);
module.exports = objRouter;
