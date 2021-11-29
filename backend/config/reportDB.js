import mongoose from "mongoose";

const connectReportDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://oSamDavis:THEPASSWORD1@course-schedule-system.gv169.mongodb.net/reportsLog?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log(`MongoDB connected successfully: ${conn.connection.host} `);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectReportDB;
