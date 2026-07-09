function ChiefComplaint({ prescription, setPrescription }) {
  return (
    <div>
      <h2 className="section-title">Chief Complaint</h2>

      <textarea
        rows="3"
        placeholder="Enter chief complaint..."
        value={prescription.chiefComplaint}
        onChange={(e) =>
          setPrescription({
            ...prescription,
            chiefComplaint: e.target.value,
          })
        }
      />
    </div>
  );
}

export default ChiefComplaint;