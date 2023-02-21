const Objective = require("../models/Objective");
const objMiddleware = {
  checkRequired: async (req, res, next) => {
    const {
      due_date,
      start_date,
      mentor,
      progress,
      reason,
      target,
      title,
      type,
      user_id,
    } = req.body;
    if (
      !due_date ||
      !start_date ||
      !mentor ||
      !reason ||
      !type ||
      !user_id ||
      !title
    ) {
      return res.status(400).json({
        message: "Điền thiếu thông tin, vui lòng nhập đầy đủ thông tin",
      });
    }
    next();
  },
  checkUpdate: async (req, res, next) => {
    const list = Object.keys(req.body);
    // console.log(list);
    if (list.includes("user_id")) {
      return res.status(400).json({
        message: "Không được phép sửa user_id",
      });
    }
    next();
  },
};
module.exports = objMiddleware;
