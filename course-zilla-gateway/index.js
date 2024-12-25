require("dotenv").config();
const app = require("./gateway");

const startServer = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log("gateway is listning at ", process.env.PORT);
    });
  } catch (error) {
    console.log("error in starting gateway", error.message);
  }
};

startServer();
