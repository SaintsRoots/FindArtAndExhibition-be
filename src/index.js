import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import dbConnector from "./app.js";
import morgan from "morgan";
import cors from "cors";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4200;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "John Muhoza",
    message: "Welcome to the FIND ART SYSTEM AND EXHIBITION API",
  });
});


// Database connection
dbConnector;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: http://localhost:${PORT}`);
});
