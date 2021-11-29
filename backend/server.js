import express from "express";
import connectDB from "./config/db.js";
import connectReportDB from "./config/reportDB.js";
import multer from "multer";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

connectDB();
// connectReportDB();
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
app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));