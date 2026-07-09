const express = require("express");
const router = express.Router();

const {
  addDiagnosis,
  getDiagnoses,
  linkMedicines,
  getDiagnosisByName,
} = require("../controllers/diagnosisController");

router.post("/", addDiagnosis);

router.get("/", getDiagnoses);

router.get("/name/:name", getDiagnosisByName);

router.put("/:id/medicines", linkMedicines);

module.exports = router;