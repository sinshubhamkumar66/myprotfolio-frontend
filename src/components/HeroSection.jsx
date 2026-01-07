import { useEffect, useState } from "react";
import api, { getProfile } from "../services/api";        // ✅ use central api
import "../styles/HeroSection.css";
import heroImg from "../assets/hero.PNG"; // static image

export default function HeroSection() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(); // ✅ no localhost
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Loading state
  if (loading) {
    return <section className="hero">Loading...</section>;
  }

  // If profile not created yet (admin hasn’t added it)
  if (!profile) {
    return null;
  }

  return (
    <section className="hero">
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <h1>
            Hi, I’m <span>{profile.fullName}</span> 👋
          </h1>

          <h2>{profile.title}</h2>

          <div className="hero-meta">
            <span>{profile.experience}</span>
          </div>

          <p>{profile.tagline}</p>

          <div className="hero-buttons">
            <button className="primary-btn">View My Work</button>
            <button className="secondary-btn">Contact Me</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right">
          <div className="profile-wrapper">
            <img
              src={heroImg}
              alt="Profile"
              className="profile-image"
            />

            {/* Floating skill tags */}
            <span className="skill-tag spring">Spring Boot</span>
            <span className="skill-tag react">React</span>
            <span className="skill-tag java">Java</span>
          </div>
        </div>
      </div>
    </section>
  );
}
