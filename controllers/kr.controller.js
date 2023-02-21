const keyResult = require("../models/KR");
const Objective = require("../models/Objective");
const { updateProgress } = require("../service/objective.service");

const KRController = {
  create: async (req, res) => {
    try {
      const KRData = req.body;
      const newKR = await keyResult.create(KRData);
      const obj = await Objective.findOne({ _id: newKR.objective_id });
      // console.log(obj);
      if (obj) {
        updateProgress(obj);
      }
      return res.status(201).json({
        message: "Đăng mới key-result thành công",
        data: newKR,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  getKRByID: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(req.params);
      const data = await keyResult.findById(id);
      if (data) {
        return res.status(200).json({
          message: "Tìm thấy key-result",
          keyresult: data,
        });
      }
      return res.status(404).json({
        message: "Key-result không tồn tại",
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
      // console.log(Boolean(req.body.length));
      const data = await keyResult.findByIdAndUpdate(id, req.body);
      if (data) {
        if ("progress" in req.body) {
          const obj = await Objective.findOne({ _id: data.objective_id });
          // console.log(obj);
          if (obj) {
            updateProgress(obj);
          }
          // else {
          //   console.log("Hông update đâu");
          // }
        }
        return res.status(200).json({
          message: "Sửa key-result thành công",
          keyresult: data,
        });
      }
      return res.status(404).json({
        message: "Key-result không tồn tại",
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
      const data = await keyResult.findByIdAndDelete(id);
      if (data) {
        return res.status(200).json({
          message: "Xoá key-result thành công",
          // obj: data,
        });
      }
      return res.status(404).json({
        message: "Key-result không tồn tại",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
};
module.exports = KRController;
