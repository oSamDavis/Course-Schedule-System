import express from "express";
import {
  createReport,
  getReports,
  deleteReport,
} from "../controller/reportController.js";

const router = express.Router();

router.route("/").post(createReport);
router.route("/").get(getReports);
router.route("/:id").delete(deleteReport);

export default router;
