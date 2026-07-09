import "./Navbar.css";
import FieldVoiceButton from "./FieldVoiceButton";

function Navbar({
  theme,
  setTheme,
  handlePrint,
  clearPrescription,
  doctorName,
  setDoctorName,
}) {
  return (
    <nav className="navbar">

      {/* Left Side */}
      <div className="navbar-left">

        <div className="logo">
          Rx
        </div>

        <div className="logo-text">
          <h2>VoiceRx</h2>
          <p>PRESCRIPTION STUDIO</p>
        </div>

      </div>

      {/* Center */}
      <div className="doctor-card">

  <span className="doctor-icon">👨‍⚕️</span>

  <input
    type="text"
    placeholder="Doctor Name"
    className="doctor-input"
    value={doctorName}
    onChange={(e) => setDoctorName(e.target.value)}
  />


</div>

      {/* Right */}
      <div className="navbar-right">

        <button onClick={clearPrescription}>
          🆕 New
        </button>

        <button onClick={handlePrint}>
          🖨 Print
        </button>

      </div>

    </nav>
  );
}

export default Navbar;