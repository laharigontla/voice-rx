const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const diagnosisRoutes = require("./routes/diagnosisRoutes");

const medicineRoutes = require("./routes/medicineRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medicines", medicineRoutes);
app.use("/api/diagnoses", diagnosisRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("VoiceRx Backend Running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
  });