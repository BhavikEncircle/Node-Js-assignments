const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bhavikpencircle_db_user:mongo123456@cluster0.xuhegx7.mongodb.net/?appName=Cluster0",
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error : ", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
