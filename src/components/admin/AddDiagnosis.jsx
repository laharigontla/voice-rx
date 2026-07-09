import { useState } from "react";

function AddDiagnosis({ onDiagnosisAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter diagnosis name");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/diagnoses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setName("");

      if (onDiagnosisAdded) {
        onDiagnosisAdded();
      }

    } catch (error) {
      console.error(error);
      alert("Failed to add diagnosis");
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ textAlign: "center" }}>
        Add Diagnosis
      </h2>

      <input
        type="text"
        placeholder="Diagnosis Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Save Diagnosis
      </button>
    </div>
  );
}

export default AddDiagnosis;