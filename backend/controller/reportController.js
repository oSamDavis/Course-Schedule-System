import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Report from "../model/reportModel.js";
import fs from "fs";
import formatReport from "../router/reportGenerateUtil.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { getJsonFromPdf, generateSingleReport } from "../utils.js";
import fsp from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateReportsJson() {
  var files = await fsp.readdir(path.join(__dirname, "..", "transcripts"));

  if (!files) {
    console.log("error processing files");
    return;
  }

  for (var i = 0; i < files.length; i++) {
    await getJsonFromPdf(
      path.join(__dirname, "..", "transcripts", files[i]),
      path.join(__dirname, "..", "router", "reports")
    );
  }
}

const createReport = asyncHandler(async (req, res) => {
  await generateReportsJson();

  const { name, id } = req.body;

  // get courseList

  var courseData = await formatReport(id);
  var courseList = JSON.stringify(courseData);

  console.log(courseList);
  while (!courseList) {
    courseData = await formatReport(id);
    courseList = JSON.stringify(courseData);
  }

  // create new report, from name, id and courseList
  const newReport = new Report({
    name,
    id,
    courseList,
  });

  try {
    await newReport.save(); // until everything is done
    res.status(201).json(newReport);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getReports = asyncHandler(async (req, res) => {
  const Reports = await Report.find();
  res.json(Reports);
});

const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Incorrect ID");
  }

  await Report.findByIdAndRemove(id);
  res.json({ message: "Report Deleted Successfully" });
});

export { createReport, getReports, deleteReport };
