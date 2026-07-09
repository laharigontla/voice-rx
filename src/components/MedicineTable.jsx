import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import FieldVoiceButton from "./FieldVoiceButton";
import { parseMedicineCommand } from "../utils/medicineParser";
import { fuzzyMedicineSearch } from "../utils/fuzzyMedicineSearch";
import { FaEdit } from "react-icons/fa";

function MedicineTable({
  prescription,
  setPrescription,
  activeField,
  setActiveField,
  suggestions,
}) {

  const [allMedicines, setAllMedicines] = useState([]);
  const [showNewMedicineRow, setShowNewMedicineRow] = useState(false);

const [newMedicine, setNewMedicine] = useState({
  medicine: "",
  morning: "",
  afternoon: "",
  evening: "",
  night: "",
  days: "",
});
  const medicineOptions = allMedicines.map((med) => ({
  value: med.name,
  label: `${med.name} (${med.strength})`,
}));

  const toggleDose = (index, field) => {
    const updatedMedicines = [...prescription.medicines];

    updatedMedicines[index][field] =
      updatedMedicines[index][field] ? "" : "✓";

    setPrescription({
      ...prescription,
      medicines: updatedMedicines,
    });
  };

  useEffect(() => {
  const fetchMedicines = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/medicines`
      );

      const data = await response.json();

      setAllMedicines(data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchMedicines();
}, []);

  return (
    <div>
      <div className="voice-field">
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }}
>
  <h2 className="section-title" style={{ marginBottom: 0 }}>
    Medicines
  </h2>

  <div
    style={{
      display: "flex",
      gap: "10px",
      alignItems: "center",
    }}
  >

    <button
      type="button"
      className="field-mic"
      onClick={() => setShowNewMedicineRow(true)}
      title="Edit Medicines"
    >
      <FaEdit />
    </button>
  </div>
</div>

        <FieldVoiceButton
  field="medicine"
  activeField={activeField}
  setActiveField={setActiveField}
  onResult={async (text) => {
  const medicine = parseMedicineCommand(text);

  if (!medicine) return;

  try {
    // First try exact search
const searchResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/medicines/search/${encodeURIComponent(
    medicine.medicine
  )}`
);

let dbMedicine = await searchResponse.json();

// If exact search fails, try fuzzy search
if (!dbMedicine) {
  dbMedicine = await fuzzyMedicineSearch(medicine.medicine);

  if (dbMedicine) {
    const useSuggestion = window.confirm(
      `Did you mean "${dbMedicine.name}"?`
    );

    if (useSuggestion) {
      medicine.medicine = dbMedicine.name;
      medicine.strength = dbMedicine.strength || medicine.strength;
    } else {
      dbMedicine = null;
    }
  }
}

    // If medicine not found
    if (!dbMedicine) {
      const saveMedicine = window.confirm(
        `${medicine.medicine} was not found in the database.\n\nDo you want to save it?`
      );

      if (!saveMedicine) return;

      const addResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/medicines`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: medicine.medicine,
            strength: medicine.strength || "",
            type: "Tablet",
            category: "General",
            manufacturer: "Unknown",
          }),
        }
      );

      const added = await addResponse.json();
      dbMedicine = added.medicine;
    }

    // Prevent duplicate medicines
    const alreadyExists = prescription.medicines.some(
      (m) =>
        m.medicine.toLowerCase() ===
        medicine.medicine.toLowerCase()
    );

    if (alreadyExists) {
      alert("Medicine already added.");
      return;
    }

    // Add medicine to prescription
    setPrescription((prev) => ({
      ...prev,
      medicines: [
        ...prev.medicines,
        {
          medicine: medicine.medicine,
          strength: medicine.strength,
          morning: medicine.morning,
          afternoon: medicine.afternoon,
          evening: medicine.evening,
          night: medicine.night,
          days: medicine.days,
        },
      ],
    }));
  } catch (error) {
    console.error(error);
    alert("Unable to process medicine.");
  }
}}
/>
      </div>

<div className="medicine-table-wrapper">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>M</th>
            <th>A</th>
            <th>E</th>
            <th>N</th>
            <th>Days</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {showNewMedicineRow && (
<tr>

<td style={{minWidth:"220px"}}>

<CreatableSelect
options={medicineOptions}
placeholder="Search or type new medicine..."
isClearable
onChange={(selected) =>
  setNewMedicine({
    ...newMedicine,
    medicine: selected ? selected.value : "",
  })
}
/>

</td>

<td>

<input
type="checkbox"
checked={newMedicine.morning==="✓"}
onChange={(e)=>
setNewMedicine({
...newMedicine,
morning:e.target.checked?"✓":""
})
}
/>

</td>

<td>

<input
type="checkbox"
checked={newMedicine.afternoon==="✓"}
onChange={(e)=>
setNewMedicine({
...newMedicine,
afternoon:e.target.checked?"✓":""
})
}
/>

</td>

<td>

<input
type="checkbox"
checked={newMedicine.evening==="✓"}
onChange={(e)=>
setNewMedicine({
...newMedicine,
evening:e.target.checked?"✓":""
})
}
/>

</td>

<td>

<input
type="checkbox"
checked={newMedicine.night==="✓"}
onChange={(e)=>
setNewMedicine({
...newMedicine,
night:e.target.checked?"✓":""
})
}
/>

</td>

<td>

<input
type="number"
value={newMedicine.days}
onChange={(e)=>
setNewMedicine({
...newMedicine,
days:e.target.value
})
}
style={{width:"55px"}}
/>

</td>

<td>
  <button
    className="add-btn"
    onClick={async () => {
      if (!newMedicine.medicine.trim()) {
        alert("Please select a medicine.");
        return;
      }

      try {
        const searchResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/medicines/search/${encodeURIComponent(
            newMedicine.medicine
          )}`
        );

        let dbMedicine = await searchResponse.json();

        if (!dbMedicine) {
          const addResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/medicines`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: newMedicine.medicine,
                type: "Tablet",
                strength: "",
                category: "General",
                manufacturer: "Unknown",
              }),
            }
          );

          const added = await addResponse.json();
          dbMedicine = added.medicine;

          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/medicines`
          );
          const medicines = await response.json();
          setAllMedicines(medicines);
        }

        setPrescription((prev) => ({
          ...prev,
          medicines: [...prev.medicines, newMedicine],
        }));

        setNewMedicine({
          medicine: "",
          morning: "",
          afternoon: "",
          evening: "",
          night: "",
          days: "",
        });

        setShowNewMedicineRow(false);
      } catch (error) {
        console.error(error);
        alert("Unable to save medicine.");
      }
    }}
  >
    ➕ Add
  </button>
</td>

</tr>
)}
          
          {prescription.medicines.map((medicine, index) => (
            <tr key={index}>

              <td style={{ minWidth: "220px" }}>
  <CreatableSelect
    options={medicineOptions}
    value={
      medicineOptions.find(
        (option) => option.value === medicine.medicine
      ) || {
        value: medicine.medicine,
        label: medicine.medicine,
      }
    }
    onChange={(selected) => {
      const updatedMedicines = [...prescription.medicines];

      updatedMedicines[index].medicine = selected
        ? selected.value
        : "";

      setPrescription({
        ...prescription,
        medicines: updatedMedicines,
      });
    }}
    onInputChange={(inputValue) => {
      const updatedMedicines = [...prescription.medicines];

      updatedMedicines[index].medicine = inputValue;

      setPrescription({
        ...prescription,
        medicines: updatedMedicines,
      });
    }}
    placeholder="Medicine"
    isClearable
    isSearchable
    menuPortalTarget={document.body}
    styles={{
      menuPortal: (base) => ({
        ...base,
        zIndex: 9999,
      }),
    }}
  />
</td>
            

              <td>
  <input
    type="checkbox"
    checked={medicine.morning === "✓"}
    onChange={() => toggleDose(index, "morning")}
  />
</td>

              <td>
  <input
    type="checkbox"
    checked={medicine.afternoon === "✓"}
    onChange={() => toggleDose(index, "afternoon")}
  />
</td>

              <td>
  <input
    type="checkbox"
    checked={medicine.evening === "✓"}
    onChange={() => toggleDose(index, "evening")}
  />
</td>

              <td>
  <input
    type="checkbox"
    checked={medicine.night === "✓"}
    onChange={() => toggleDose(index, "night")}
  />
</td>

<td>
  <input
    type="number"
    min="1"
    value={medicine.days}
    onChange={(e) => {
      const updatedMedicines = [...prescription.medicines];

      updatedMedicines[index].days = e.target.value;

      setPrescription({
        ...prescription,
        medicines: updatedMedicines,
      });
    }}
    style={{
      width: "55px",
      padding: "5px",
      textAlign: "center",
      borderRadius: "4px",
      border: "1px solid #ccc",
    }}
  />
</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => {
                    const updatedMedicines =
                      prescription.medicines.filter(
                        (_, i) => i !== index
                      );

                    setPrescription({
                      ...prescription,
                      medicines: updatedMedicines,
                    });
                  }}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

      {/* ================= Quick Medicine Suggestions ================= */}

<div className="medicine-suggestions">

  <h3 className="section-title">
    💊 Suggested Medicines Based on Diagnosis
  </h3>

  {suggestions.length === 0 ? (

    <p style={{ color: "#666" }}>
      Enter a diagnosis to view medicine suggestions.
    </p>

  ) : (

    <div className="suggestion-list">

      {suggestions.map((medicine) => (

  <button
    key={medicine._id}
    className="suggestion-chip"
    onClick={() =>
      setPrescription({
        ...prescription,
        medicines: [
          ...prescription.medicines,
          {
            medicine: medicine.name,
            morning: "",
            afternoon: "",
            evening: "",
            night: "",
            days: "",
          },
        ],
      })
    }
  >
    {medicine.name}
  </button>

))}

    </div>

  )}

</div>
    </div>
  );
}



export default MedicineTable;