process.on("uncaughtException", err => console.error("UNCAUGHT:", err));
process.on("unhandledRejection", err => console.error("UNHANDLED:", err));

require("dotenv").config();

const http = require("http");
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 3000;

connectDB();

http.createServer(app).listen(PORT, () => {
  console.log(`OUTLAST running on port ${PORT}`);
});
