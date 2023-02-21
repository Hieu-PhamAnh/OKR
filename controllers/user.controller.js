const User = require("../models/User");
const Objective = require("../models/Objective");
const { default: mongoose } = require("mongoose");
const { spawnToken, deleteTokenDB } = require("../service/auth.service");
const Token = require("../models/Token");

const UserController = {
  create: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      return res.status(201).json({
        message: "Tạo tài khoản thành công",
        // user: newUser,
        // không cần trả về đối tượng user
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  getUserByID: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await User.findById(id);
      if (data) {
        return res.status(200).json({
          message: "Thành công",
          user: data,
        });
      }
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await User.findByIdAndUpdate(id, req.body);
      if (data) {
        return res.status(200).json({
          message: "Sửa thông tin thành công",
          user: data,
        });
      }
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await User.findByIdAndDelete(id);
      if (data) {
        return res.status(200).json({
          message: "Xoá người dùng thành công",
          // user: data,
        });
      }
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      // console.log(user);
      if (!user) {
        return res.status(404).json({
          message: "Người dùng không tồn tại",
        });
      }
      if (user.password != password) {
        return res.status(401).json({
          message: "Sai mật khẩu",
        });
      }
      deleteTokenDB(user);
      const token = await spawnToken(user);
      //console.log(token);
      const newToken = await Token.create({
        userID: user._id,
        token: token.refreshToken,
      });
      return res.status(200).json({
        message: "Đăng nhập thành công",
        username: user.username,
        userId: user._id,
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  getObjByUserID: async (req, res) => {
    const { id } = req.params;
    const { page, limit } = req.query;
    try {
      const userID = new mongoose.Types.ObjectId(id);
      const pipeline = [
        {
          $match: {
            user_id: userID,
          },
        },
        {
          $project: {
            __v: 0,
            user_id: 0,
            createdAt: 0,
            updatedAt: 0,
          },
        },
        {
          $sort: {
            progress: 1,
          },
        },
        {
          $facet: {
            count: [
              {
                $count: "NumberOfDocument",
              },
            ],
            objectives: [
              {
                $skip: Number(page - 1) * Number(limit), //page * limit,
              },
              {
                $limit: Number(limit), //limit,
              },
            ],
          },
        },
      ];
      const data = await Objective.aggregate(pipeline);
      // console.log(data);
      // console.log(data[0].objectives.length);
      // console.log(data[0].count.length);
      if (data[0].objectives.length) {
        return res.status(200).json({
          message: "Thành công",
          data: data,
        });
      }
      if (data[0].count.length) {
        return res.status(404).json({
          message: "Đã lấy ra hết objective",
        });
      }
      return res.status(404).json({
        message: "User chưa có objective nào",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
};

module.exports = UserController;
