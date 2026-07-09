import "../styles/PrescriptionPrint.css";

function PrescriptionPrint({ prescription }) {
  return (
    <div id="print-area" className="print-preview">

      {/* Header */}
      <div className="preview-header">

        <div className="preview-live">

        </div>

        <div className="hospital">
          <h1>VoiceRx Hospital</h1>
          <p>AI Voice Prescription</p>
        </div>

      </div>

      <hr className="divider" />

      {/* Patient Details */}

      <section className="patient-section">

  <h3 className="section-heading">
    Patient Information
  </h3>

  <div className="patient-grid">

    <div className="info-card">
      <span className="label">Patient Name</span>
      <span className="value">
        {prescription.patientName || "-"}
      </span>
    </div>

    <div className="info-card">
      <span className="label">Age / Gender</span>
      <span className="value">
        {(prescription.age || "-") + " / " + (prescription.gender || "-")}
      </span>
    </div>

    <div className="info-card">
      <span className="label">Blood Group</span>
      <span className="value">
        {prescription.bloodGroup || "-"}
      </span>
    </div>

    <div className="info-card">
      <span className="label">Weight</span>
      <span className="value">
        {prescription.weight || "-"} kg
      </span>
    </div>

    <div className="info-card">
      <span className="label">BP</span>
      <span className="value">
        {prescription.bp || "-"}
      </span>
    </div>

    <div className="info-card">
      <span className="label">Temperature</span>
      <span className="value">
        {prescription.temperature || "-"} °F
      </span>
    </div>

  </div>

</section>

<hr className="divider" />

<SectionTitle>Chief Complaint</SectionTitle>

<p className="print-text">
  {prescription.chiefComplaint || "-"}
</p>

<hr className="divider" />

      <SectionTitle>Diagnosis</SectionTitle>

      <p className="print-text">
        {prescription.diagnosis || "-"}
      </p>

      <hr className="divider" />

      <SectionTitle>Medicines</SectionTitle>

<div className="print-table-wrapper">
      <table className="print-table">

        <thead>

          <tr>

            <th>Medicine</th>
            <th>M</th>
            <th>A</th>
            <th>E</th>
            <th>N</th>
            <th>Days</th>

          </tr>

        </thead>

        <tbody>

          {prescription.medicines.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="empty-cell"
              >
                No medicines added
              </td>

            </tr>

          ) : (

            prescription.medicines.map(
              (medicine, index) => (

                <tr key={index}>

                  <td>{medicine.medicine}</td>

                  <td>{medicine.morning ? "✓" : ""}</td>

                  <td>{medicine.afternoon ? "✓" : ""}</td>

                  <td>{medicine.evening ? "✓" : ""}</td>

                  <td>{medicine.night ? "✓" : ""}</td>

                  <td>{medicine.days}</td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>
</div>
      <hr className="divider" />

      <SectionTitle>Advice</SectionTitle>

      <p className="print-text">
        {prescription.advice || "-"}
      </p>

      <div className="signature">

        <div>
          ______________________
          <br />
          Doctor Signature
        </div>

        <div className="date">
          Date
          <br />
          {new Date().toLocaleDateString()}
        </div>

      </div>

    </div>
  );
}


function SectionTitle({ children }) {
  return (
    <h3 className="section-title-print">
      {children}
    </h3>
  );
}

export default PrescriptionPrint;