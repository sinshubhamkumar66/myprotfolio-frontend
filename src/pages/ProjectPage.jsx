import { useEffect, useState } from "react";
import api, { getProjects } from "../services/api";
import "../styles/ProjectsPage.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  // ================= FETCH PROJECTS =================
  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="projects-page">
      <h1 className="projects-title">Professional Projects</h1>
      <p className="projects-subtitle">
        Real-world enterprise projects I’ve worked on
      </p>

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-header">
              <h3>{project.projectName}</h3>

              {project.currentProject && (
                <span className="badge-current">Current</span>
              )}
            </div>

            <p className="company-role">
              <strong>{project.companyName}</strong> · {project.role}
            </p>

            <p className="duration">{project.duration}</p>

            <p className="description">{project.description}</p>

            {/* RESPONSIBILITIES */}
            {project.responsibilities && (
              <div className="responsibilities">
                <strong>Responsibilities:</strong>
                <ul>
                  {project.responsibilities
                    .split(".")
                    .filter(item => item.trim() !== "")
                    .map((item, index) => (
                      <li key={index}>{item.trim()}.</li>
                    ))}
                </ul>
              </div>
            )}

            {/* TECH STACK */}
            {project.techStack && (
              <div className="tech-stack">
                {project.techStack.split(",").map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="empty-state">No projects available.</p>
      )}
    </section>
  );
}
