const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const ErrorHandler = require("./utils/ErrorHandler");

// Config .env file
dotenv.config({
  path: path.join(__dirname, `env/${process.env.NODE_ENV}.env`),
});

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router index
const indexRouter = require("./routes/index");
  app.use("/", indexRouter);
  app.all("*", (req, res, next) => {
    return next(new ErrorHandler("Invalid Url.", 404))
  });

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Health Check");
});

// Middleware for Errors
app.use(errorMiddleware);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to Uncaught Exception`);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || null;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} using ${ENV} env.`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
