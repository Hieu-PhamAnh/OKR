const User = require("../models/User");
const validate = require("../helper/validation");
const userMiddleware = {
  checkRequired: async (req, res, next) => {
    const { username, password, email } = req.body;
    if (
      !username ||
      !password ||
      !email
      // !first_name ||
      // !last_name ||
      // !phone ||
      // !dob
    ) {
      return res.status(400).json({
        message: "Điền thiếu thông tin, vui lòng nhập đầy đủ thông tin",
      });
    }
    next();
  },
  checkRequiredLogin: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Điền thiếu thông tin, vui lòng nhập đầy đủ thông tin",
      });
    }
    next();
  },
  checkValid: async (req, res, next) => {
    const { email, password } = req.body;
    if (!validate.isValidEmail(email)) {
      return res.status(400).json({
        message: "Email không hợp lệ",
      });
    }
    if (!validate.isValidPassword(password)) {
      return res.status(400).json({
        message:
          "Password không hợp lệ, cần tối thiểu 8 kí tự và phải có chữ cái và số",
      });
    }
    next();
  },
  checkExist: async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    // console.log(user);
    if (user) {
      return res.status(400).json({
        message: "Email đã được sử dụng",
      });
    }
    next();
  },
  checkUpdate: async (req, res, next) => {
    const list = Object.keys(req.body);
    // console.log(list);
    if (list.includes("email") || list.includes("_id")) {
      return res.status(400).json({
        message: "Không được phép sửa email, user_id",
      });
    }
    if (list.includes("password")) {
      if (!validate.isValidPassword(req.body.password)) {
        return res.status(400).json({
          message:
            "Password không hợp lệ, cần tối thiểu 8 kí tự và phải có chữ cái và số",
        });
      }
    }
    next();
  },
};

module.exports = userMiddleware;
