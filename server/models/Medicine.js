const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Tablet", "Capsule", "Syrup", "Injection", "Drops", "Cream", "Ointment", "Inhaler", "Other"],
      default: "Tablet",
    },

    strength: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    manufacturer: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);