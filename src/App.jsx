import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PatientDetails from "./components/PatientDetails";
import Diagnosis from "./components/Diagnosis";
import MedicineTable from "./components/MedicineTable";
import Advice from "./components/Advice";
import PrescriptionPrint from "./components/PrescriptionPrint";
import ChiefComplaint from "./components/ChiefComplaint";

function App() {
  const [doctorName, setDoctorName] = useState("");
  const [prescription, setPrescription] = useState({
    patientName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    weight: "",
    bp: "",
    temperature: "",
    chiefComplaint: "",
    diagnosis: "",
    advice: "",
    medicines: [],
  });

  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]); 

  const clearPrescription = () => {
    setPrescription({
      patientName: "",
      age: "",
      gender: "",
      bloodGroup: "",
      weight: "",
      bp: "",
      temperature: "",
      chiefComplaint: "",
      diagnosis: "",
      advice: "",
      medicines: [],
    });
  };

  const handlePrint = () => {
  window.print();
};

  return (
    <div className="app-container">
      <Navbar
  handlePrint={handlePrint}
  clearPrescription={clearPrescription}
  doctorName={doctorName}
  setDoctorName={setDoctorName}
/>

      <div className="main-layout">

        {/* Left Panel */}
        <div className="left-panel">

          <div className="patient-card">

            <PatientDetails
              prescription={prescription}
              setPrescription={setPrescription}
            />

            <ChiefComplaint
              prescription={prescription}
              setPrescription={setPrescription}
            />

            <Diagnosis
              prescription={prescription}
              setPrescription={setPrescription}
              activeField={activeField}
              setActiveField={setActiveField}
              setSuggestions={setSuggestions}
            />

            <Advice
              prescription={prescription}
              setPrescription={setPrescription}
              activeField={activeField}
              setActiveField={setActiveField}
            />

            <MedicineTable
              prescription={prescription}
              setPrescription={setPrescription}
              activeField={activeField}
              setActiveField={setActiveField}
              suggestions={suggestions}
            />

          </div>

        </div>

        {/* Right Panel */}
        <div className="right-panel">

          <PrescriptionPrint
            prescription={prescription}
          />

        </div>

      </div>
    </div>
  );
}

export default App;