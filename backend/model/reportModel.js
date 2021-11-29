import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  name: String,
  id: String,
  // transcript: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
