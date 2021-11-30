import express from "express";
import connectDB from "./config/db.js";
import connectReportDB from "./config/reportDB.js";
import multer from "multer";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { getJsonFromPdf, generateSingleReport } from "./utils.js";
import fsp from "fs/promises";
import asyncHandler from "express-async-handler";

const __dirname = dirname(fileURLToPath(import.meta.url));

// connectDB();
connectReportDB();
import contactRoutes from "./router/contactRouter.js";
import reportRoutes from "./router/reportRouter.js";
import generateReportRoutes from "./router/reportGenerate.js";

const app = express();

app.use(express.json({ limit: "80mb" }));
app.use(cors());
app.use("/contact", contactRoutes);
app.use("/report", reportRoutes);

app.use("/reportGenerate", generateReportRoutes);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // '/Users/samdavisomekara/Desktop/Full-Stack-Projects/Contact-Book-MERN/backend'
    cb(null, path.join(__dirname, `transcripts`));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage }).single("file");
app.post("/upload", async function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);

    
  });
  // await generateReportsJson();
});

export async function generateReportsJson() {
  var files = await fsp.readdir(path.join(__dirname, "transcripts"));

  if (!files) {
    console.log("error processing files");
    return;
  }

  for (var i = 0; i < files.length; i++) {
    getJsonFromPdf(
      path.join(__dirname, "transcripts", files[i]),
      path.join(__dirname, "router", "reports")
    );
  }
}

app.get("/getReport", async (req, res) => {
  let reports = [];
  var files = await fsp.readdir(path.join(__dirname, "router", "reports"));

  for (var i = 0; i < files.length; i++) {
    var data = await fsp.readFile(
      path.join(__dirname, "router", "reports", files[i])
    );
    reports.push(generateSingleReport(JSON.parse(data)));
  }

  res.json({ reports: reports });
});

app.get("/getReport/:id", async (req, res) => {
  try {
    var data = await fsp.readFile(
      path.join(__dirname, "router", "reports", req.params.id + ".json")
    );
    res.json({ report: JSON.parse(data) });
  } catch (err) {
    res.status(404).send("report not generated");
  }
});


const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
