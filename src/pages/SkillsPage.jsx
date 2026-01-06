import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/SkillsPage.css";
import { getSkills } from "../services/api";

export default function SkillsPage() {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    getSkills().
      then(res => groupByCategory(res.data));
  }, []);

  const groupByCategory = (data) => {
    const grouped = data.reduce((acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
    setSkills(grouped);
  };

  return (
    <section className="skills-page">
      <h1 className="skills-title">Skills & Expertise</h1>
      <p className="skills-subtitle">
        Technologies and tools I work with
      </p>

      {Object.keys(skills).map(category => (
        <div key={category} className="skills-category">
          <h2>{category.replace("_", " ")}</h2>

          <div className="skills-grid">
            {skills[category].map(skill => (
              <div className="skill-card" key={skill.id}>
                <span className="skill-name">{skill.name}</span>
                <span className={`skill-level ${skill.level.toLowerCase()}`}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
