import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSkill() {
  const [skill, setSkill] = useState({
    name: "",
    category: "BACKEND",
    level: "BEGINNER",
  });

  const [skills, setSkills] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH SKILLS =================
  const fetchSkills = async () => {
    const res = await axios.get("http://localhost:8081/api/skills");
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ================= HANDLE FORM =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkill((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8081/api/admin/skills",
      skill,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSuccessMsg("✅ Skill saved successfully");
    setSkill({ name: "", category: "BACKEND", level: "BEGINNER" });
    fetchSkills();

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ================= DELETE =================
  const deleteSkill = async (id) => {
    await axios.delete(
      `http://localhost:8081/api/admin/skills/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h3>Admin – Manage Skills</h3>

      {/* ADD FORM */}
      <div className="admin-card">
        {successMsg && <div className="success-message">{successMsg}</div>}

        <form onSubmit={handleSubmit}>
          <label>Skill Name</label>
          <input
            type="text"
            name="name"
            value={skill.name}
            onChange={handleChange}
            required
          />

          <label>Skill Category</label>
          <select
            name="category"
            value={skill.category}
            onChange={handleChange}
          >
            <option value="BACKEND">Backend</option>
            <option value="FRONTEND">Frontend</option>
            <option value="DATABASE">Database</option>
            <option value="CLOUD">Cloud</option>
            <option value="DEVOPS">DevOps</option>
            <option value="OTHER">Other</option>
          </select>

          <label>Proficiency Level</label>
          <select
            name="level"
            value={skill.level}
            onChange={handleChange}
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          <button type="submit">Save Skill</button>
        </form>
      </div>

      {/* LIST SKILLS */}
      <div className="admin-card" style={{ marginTop: "30px" }}>
        <h4>Saved Skills</h4>

        {skills.length === 0 && <p>No skills added yet.</p>}

        <ul className="admin-skill-list">
          {skills.map((s) => (
            <li key={s.id} className="admin-skill-item">
              <div>
                <strong>{s.name}</strong>
                <span className="skill-meta">
                  {s.category} · {s.level}
                </span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteSkill(s.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
