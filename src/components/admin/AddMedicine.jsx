import { useState } from "react";

function AddMedicine({ onMedicineAdded }) {
  const [form, setForm] = useState({
    name: "",
    strength: "",
    type: "",
    category: "",
    manufacturer: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "import.meta.env.VITE_API_URL/api/medicines",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    alert(data.message);

    setForm({
      name: "",
      strength: "",
      type: "",
      category: "",
      manufacturer: "",
    });

    onMedicineAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "30px",
      }}
    >
      <h2>Add Medicine</h2>

      <input
        name="name"
        placeholder="Medicine Name"
        value={form.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="strength"
        placeholder="Strength"
        value={form.strength}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="type"
        placeholder="Type"
        value={form.type}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="manufacturer"
        placeholder="Manufacturer"
        value={form.manufacturer}
        onChange={handleChange}
      />

      <br />
      <br />

      <button type="submit">
        Save Medicine
      </button>
    </form>
  );
}

export default AddMedicine;