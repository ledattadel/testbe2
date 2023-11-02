const express = require("express");
const cors = require("cors"); // import cors package

const app = express();

//
const apiError = require("./utils/apiError");
const { globalErrHandler } = require("./utils/globalErrHandler");

// access environment variables
require("dotenv").config();

// connect to database
require("./config/database");

// middleware
app.use(express.json()); // pass income payload
// Tạo một hàm middleware tùy chỉnh để kiểm tra và xử lý CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://12a10.com'], // Danh sách các origin được cho phép
    credentials: true, // Cho phép sử dụng credentials mode
  })
);

// routes
const userRouters = require("./routes/User");
const authRouters = require("./routes/Auth");
const categoryRouters = require("./routes/Category");
const postRouters = require("./routes/Post");
const commentRouters = require("./routes/Comment");

// routes middlware
app.use("/api/users", userRouters);
app.use("/api/auth", authRouters);
app.use("/api/categories", categoryRouters);
app.use("/api/posts", postRouters);
app.use("/api/comments", commentRouters);

// 404 error
app.all("*", (req, res, next) => {
  // create error
  const err = new apiError(`Can't find this route ${req.originalUrl}`, 400);
  // send it to Global errors handling middlware
  next(err);
});

// Global Error Handlers Middleware
app.use(globalErrHandler);

// Listen To Server
const PORT = process.env.PORT || 3033;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
