const connectDB = require("./config/db");
connectDB();
const { setIO } = require("./socket");
require("./cronJobs");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
setIO(io);
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(express.json());

const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Blog API running");
});

const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

app.use("/", postRoutes);
app.use("/", commentRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
