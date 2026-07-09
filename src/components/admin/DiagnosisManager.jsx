import { useEffect, useState } from "react";

function DiagnosisManager() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");

  const [selectedMedicines, setSelectedMedicines] = useState([]);

  useEffect(() => {
    fetchDiagnoses();
    fetchMedicines();
  }, []);

  const fetchDiagnoses = async () => {
    const res = await fetch("http://localhost:5000/api/diagnoses");
    const data = await res.json();
    setDiagnoses(data);
  };

  const fetchMedicines = async () => {
    const res = await fetch("http://localhost:5000/api/medicines");
    const data = await res.json();
    setMedicines(data);
  };

  const saveMedicines = async () => {

  if (!selectedDiagnosis) {
    alert("Please select a diagnosis");
    return;
  }

  const response = await fetch(
    `http://localhost:5000/api/diagnoses/${selectedDiagnosis}/medicines`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        medicines: selectedMedicines,
      }),
    }
  );

  const data = await response.json();

  alert(data.message);
};

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Diagnosis Management</h2>

      <select
        value={selectedDiagnosis}
        onChange={(e) => setSelectedDiagnosis(e.target.value)}
      >
        <option value="">Select Diagnosis</option>

        {diagnoses.map((diagnosis) => (
          <option
            key={diagnosis._id}
            value={diagnosis._id}
          >
            {diagnosis.name}
          </option>
        ))}

      </select>

      <h3 style={{ marginTop: "20px" }}>
        Select Medicines
      </h3>

      {medicines.map((medicine) => (

        <div key={medicine._id}>

          <label>

            <input
              type="checkbox"
              checked={selectedMedicines.includes(medicine._id)}
              onChange={(e) => {

                if (e.target.checked) {

                  setSelectedMedicines([
                    ...selectedMedicines,
                    medicine._id,
                  ]);

                } else {

                  setSelectedMedicines(
                    selectedMedicines.filter(
                      (id) => id !== medicine._id
                    )
                  );

                }

              }}
            />

            {medicine.name}

          </label>

        </div>

      ))}

      <br />

<button
  onClick={saveMedicines}
  style={{
    marginTop: "20px",
    padding: "10px 25px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Save Medicines
</button>

    </div>
  );
}

export default DiagnosisManager;