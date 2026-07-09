const Diagnosis = require("../models/Diagnosis");

// =======================
// Add Diagnosis
// =======================
const addDiagnosis = async (req, res) => {
  try {
    const { name } = req.body;

    const existingDiagnosis = await Diagnosis.findOne({ name });

    if (existingDiagnosis) {
      return res.status(200).json({
        message: "Diagnosis already exists",
        diagnosis: existingDiagnosis,
      });
    }

    const diagnosis = new Diagnosis({
      name,
    });

    await diagnosis.save();

    res.status(201).json({
      message: "Diagnosis Added Successfully",
      diagnosis,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Get All Diagnoses
// =======================
const getDiagnoses = async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find().populate("medicines");

    res.json(diagnoses);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Link Medicines to Diagnosis
// =======================
const linkMedicines = async (req, res) => {
  try {

    const { medicines } = req.body;

    const diagnosis = await Diagnosis.findByIdAndUpdate(
      req.params.id,
      { medicines },
      { new: true }
    ).populate("medicines");

    res.json({
      message: "Medicines linked successfully",
      diagnosis,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =======================
// Get Diagnosis by Name
// =======================
const getDiagnosisByName = async (req, res) => {
  try {

    const diagnosis = await Diagnosis.findOne({
      name: new RegExp("^" + req.params.name + "$", "i"),
    }).populate("medicines");

    if (!diagnosis) {
      return res.json({
        medicines: [],
      });
    }

    res.json({
      medicines: diagnosis.medicines,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =======================
// Export Controllers
// =======================
module.exports = {
  addDiagnosis,
  getDiagnoses,
  linkMedicines,
  getDiagnosisByName,
};