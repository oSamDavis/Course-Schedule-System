import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Report from "../model/reportModel.js";
import Base64ToPDF from "base64topdf";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const createReport = asyncHandler(async (req, res) => {
  const { name, id, transcript } = req.body;

  // convert transcript to base 64
  // fs.writeFile(path.join(__dirname, "temp", `${id}.json`), "", (e) => {

  //   console.log(e);
  // });

  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = dirname(__filename);
  // let decodedBase64 = Base64ToPDF.base64Decode(
  //   transcript,
  //   path.join(__dirname, `try.pdf`)
  // );

  // const newTranscript = decodedBase64;
  // newTranscript

  console.log(transcript);

  const newReport = new Report({
    name,
    id,
    // transcript,
  });

  try {
    // use utils here to generate report
    // save report
    console.log(transcript);
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
