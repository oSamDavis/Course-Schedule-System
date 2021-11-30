import express from "express";
import Report from "../model/reportModel.js";
const router = express.Router();
import request from "request";

router.route("/:id").get(async (req, res, next) => {
  const report = await Report.findOne({ id: req.params.id }).exec();

  console.log("backend is here , picked up")

  if (!report) {
    return res.status(404).send("id not in db");
  }


  var data = {
    template: { shortid: "rkJTnK2ce" },
    data: {
      number: "1",
      student: {
        name: report.name,
        id: req.params.id,
      },
      courses: JSON.parse(report.courseList),
    },
  };

  var options = {
    uri: "http://localhost:8001/api/report",
    method: "POST",
    json: data,
  };

  request(options).pipe(res);
});

export default router;
