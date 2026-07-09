import { useEffect, useState } from "react";

import DashboardCards from "../components/admin/DashboardCards";
import SearchBar from "../components/admin/SearchBar";
import AdminMedicineTable from "../components/admin/AdminMedicineTable";
import AddMedicine from "../components/admin/AddMedicine";
import DiagnosisManager from "../components/admin/DiagnosisManager";
import AddDiagnosis from "../components/admin/AddDiagnosis";

function Admin() {
  const [medicines, setMedicines] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMedicines();
    fetchDiagnoses();
  }, []);

  const fetchMedicines = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medicines`);
    const data = await res.json();
    setMedicines(data);
  };

  const fetchDiagnoses = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/diagnoses`);
    const data = await res.json();
    setDiagnoses(data);
  };

  const deleteMedicine = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this medicine?"
  );

  if (!confirmDelete) return;

  await fetch(
  `${import.meta.env.VITE_API_URL}/api/medicines/${id}`,
  {
    method: "DELETE",
  }
);

  fetchMedicines();
};

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>🏥 VoiceRx Admin Panel</h1>

      <DashboardCards
        medicineCount={medicines.length}
        diagnosisCount={diagnoses.length}
      />

      <AddMedicine
        onMedicineAdded={fetchMedicines}
      />

      <AddDiagnosis
        onDiagnosisAdded={fetchDiagnoses}
      />

      <SearchBar search={search} setSearch={setSearch} />

      <AdminMedicineTable medicines={filteredMedicines}
      onDelete={deleteMedicine} />

      <DiagnosisManager />
    </div>
  );
}

export default Admin;