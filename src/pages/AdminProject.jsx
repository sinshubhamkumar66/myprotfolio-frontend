import { useEffect, useState } from "react";
import api, { createProject, deleteProjects, getProjects } from "../services/api";

export default function AdminProject() {
  const [project, setProject] = useState({
    projectName: "",
    companyName: "",
    role: "",
    description: "",
    responsibilities: "",
    techStack: "",
    duration: "",
    currentProject: true,
  });

  const [projects, setProjects] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  // ================= FETCH PROJECTS =================
  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProject(project);

      setSuccessMsg("✅ Project added successfully");

      setProject({
        projectName: "",
        companyName: "",
        role: "",
        description: "",
        responsibilities: "",
        techStack: "",
        duration: "",
        currentProject: true,
      });

      fetchProjects();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to add project", error);
    }
  };

  // ================= DELETE =================
  const deleteProject = async (id) => {
    try {
      await deleteProjects(id); 

      setSuccessMsg("🗑️ Project deleted successfully");
      fetchProjects();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <div>
      <h3>Admin – Manage Projects</h3>

      {successMsg && <div className="success-message">{successMsg}</div>}

      {/* ADD PROJECT */}
      <form onSubmit={handleSubmit} className="admin-card">
        <input
          name="projectName"
          placeholder="Project Name"
          value={project.projectName}
          onChange={handleChange}
          required
        />

        <input
          name="companyName"
          placeholder="Company Name"
          value={project.companyName}
          onChange={handleChange}
          required
        />

        <input
          name="role"
          placeholder="Role"
          value={project.role}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleChange}
          required
        />

        <textarea
          name="responsibilities"
          placeholder="Responsibilities (use . to separate points)"
          value={project.responsibilities}
          onChange={handleChange}
          required
        />

        <input
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={project.techStack}
          onChange={handleChange}
          required
        />

        <input
          name="duration"
          placeholder="Duration"
          value={project.duration}
          onChange={handleChange}
          required
        />

        <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="checkbox"
            name="currentProject"
            checked={project.currentProject}
            onChange={handleChange}
          />
          Current Project
        </label>

        <button type="submit">Add Project</button>
      </form>

      {/* LIST PROJECTS */}
      <div className="admin-card" style={{ marginTop: "30px" }}>
        <h4>Existing Projects</h4>

        {projects.length === 0 && <p>No projects added yet.</p>}

        <ul className="admin-skill-list">
          {projects.map((proj) => (
            <li key={proj.id} className="admin-skill-item">
              <strong>{proj.projectName}</strong>
              <button
                className="delete-btn"
                onClick={() => deleteProject(proj.id)}
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
