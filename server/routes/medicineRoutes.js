const express = require("express");
const router = express.Router();

const {
  addMedicine,
  getMedicines,
  searchMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");

router.post("/", addMedicine);

router.get("/", getMedicines);

router.get("/search/:name", searchMedicine);

router.delete("/:id", deleteMedicine);

module.exports = router;