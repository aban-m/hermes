import express from "express";
import healthRouter from "./health.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data;

app.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "Hello Express!" }));
});

// Routes
app.use("/health", healthRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
