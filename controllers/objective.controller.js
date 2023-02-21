const { default: mongoose } = require("mongoose");
const Objective = require("../models/Objective");
const KeyResult = require("../models/KR");
const { updateProgress } = require("../service/objective.service");

const objController = {
  create: async (req, res) => {
    try {
      const objData = req.body;
      //objData.progress = 0;
      const newObj = await Objective.create(objData);
      return res.status(201).json({
        message: "Đăng mới objective thành công",
        data: newObj,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  getObjByID: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(req.params);
      const data = await Objective.findById(id);
      if (data) {
        return res.status(200).json({
          message: "Tìm thấy Objective",
          obj: data,
        });
      }
      return res.status(404).json({
        message: "Objective không tồn tại",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  getAllKRbyOjbID: async (req, res) => {
    const { id } = req.params;
    const { page, limit } = req.query;
    // console.log(Number(page), " ", Number(limit));
    try {
      const objID = new mongoose.Types.ObjectId(id);
      const pipeline = [
        {
          $match: {
            objective_id: objID,
          },
        },
        {
          $project: {
            __v: 0,
            objective_id: 0,
            createdAt: 0,
            updatedAt: 0,
          },
        },
        {
          $facet: {
            count: [
              {
                $count: "NumberOfDocument",
              },
            ],
            key_results: [
              {
                $skip: Number(page - 1) * Number(limit), //page * limit,
              },
              {
                $limit: Number(limit), //limit,
              },
            ],
          },
        },
        // {
        //   $project: {
        //     "count.NumberOfDocument": 1,
        //     key_results: 1,
        //   },
        // },
      ];
      const data = await KeyResult.aggregate(pipeline);
      if (data[0].key_results.length) {
        return res.status(200).json({
          message: "Thành công",
          data: data,
        });
      }
      if (data[0].count.length) {
        return res.status(404).json({
          message: "Đã lấy ra hết key result",
        });
      }
      return res.status(404).json({
        message: "Objective chưa có key result nào",
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
      const data = await Objective.findByIdAndUpdate(id, req.body);
      if (data) {
        return res.status(200).json({
          message: "Sửa objective thành công",
          obj: data,
        });
      }
      return res.status(404).json({
        message: "Objective không tồn tại",
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
      const data = await Objective.findByIdAndDelete(id);
      if (data) {
        return res.status(200).json({
          message: "Xoá objective thành công",
          // obj: data,
        });
      }
      return res.status(404).json({
        message: "Objective không tồn tại",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
};

module.exports = objController;
