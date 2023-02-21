const KeyResult = require("../models/KR");
const KRMiddleware = {
  checkRequire: async (req, res, next) => {
    const {
      due_date,
      start_date,
      mentor,
      progress,
      step,
      target,
      title,
      objective_id,
    } = req.body;
    if (
      !due_date ||
      !start_date ||
      !step ||
      !target ||
      !title ||
      !objective_id
    ) {
      return res.status(400).json({
        message: "Điền thiếu thông tin, vui lòng nhập đầy đủ thông tin",
      });
    }
    next();
  },
};

module.exports = KRMiddleware;
