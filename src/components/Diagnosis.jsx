import "../styles/patient.css";
import FieldVoiceButton from "./FieldVoiceButton";

function Diagnosis({
  prescription,
  setPrescription,
  activeField,
  setActiveField,
  setSuggestions,
}) {
  // Fetch medicine suggestions from MongoDB
  const fetchSuggestions = async (diagnosisName) => {
    if (!diagnosisName.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `import.meta.env.VITE_API_URL/api/diagnoses/name/${diagnosisName}`
      );

      const data = await response.json();

      setSuggestions(data.medicines || []);
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    }
  };

  return (
    <div>
      <div className="voice-field">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Diagnosis
        </h2>

        <FieldVoiceButton
          field="diagnosis"
          activeField={activeField}
          setActiveField={setActiveField}
          onResult={async (text) => {
            setPrescription({
              ...prescription,
              diagnosis: text,
            });

            await fetchSuggestions(text);
          }}
        />
      </div>

      <textarea
        rows="5"
        placeholder="Enter diagnosis..."
        value={prescription.diagnosis}
        onChange={async (e) => {
          const value = e.target.value;

          setPrescription({
            ...prescription,
            diagnosis: value,
          });

          await fetchSuggestions(value);
        }}
      />
    </div>
  );
}

export default Diagnosis;