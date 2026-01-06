import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminSkill() {
  const [skill, setSkill] = useState({
    name: "",
    category: "BACKEND",
    level: "BEGINNER",
  });

  const [skills, setSkills] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  // ================= FETCH SKILLS =================
  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch skills", error);
    }
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

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/skills", skill);

      setSuccessMsg("✅ Skill saved successfully");
      setSkill({ name: "", category: "BACKEND", level: "BEGINNER" });

      fetchSkills();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to save skill", error);
    }
  };

  // ================= DELETE =================
  const deleteSkill = async (id) => {
    try {
      await api.delete(`/admin/skills/${id}`);
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete skill", error);
    }
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
