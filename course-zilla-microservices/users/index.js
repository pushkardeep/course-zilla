require("dotenv").config();
const connectDB = require("./configs/mongodb.config");
const app = require("./user.service");

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`user service is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the user service:", error);
    process.exit(1);
  }
};

startServer();
