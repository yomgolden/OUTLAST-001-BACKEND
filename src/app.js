const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.options("*", cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => res.json({ status: "OUTLAST online" }));
app.get("/health", (req, res) => res.json({ status: "healthy", uptime: process.uptime() }));

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/events", require("./routes/events"));
app.use("/leaderboard", require("./routes/leaderboard"));

app.use((req, res) => res.status(404).json({ error: "Not found" }));

module.exports = app;
