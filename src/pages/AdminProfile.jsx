import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    fullName: "",
    title: "",
    experience: "",
    tagline: "",
  });

  const [savedProfile, setSavedProfile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      if (res.data) {
        setSavedProfile(res.data);
        setProfile(res.data); // preload form for edit
      }
    } catch (error) {
      console.log("No profile exists yet");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/profile", profile);

      setSuccessMsg("✅ Profile saved successfully");
      fetchProfile();

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to save profile", error);
    }
  };

  // ================= DELETE =================
  const deleteProfile = async () => {
    if (!savedProfile) return;

    try {
      await api.delete(`/admin/profile/${savedProfile.id}`);

      setSavedProfile(null);
      setProfile({
        fullName: "",
        title: "",
        experience: "",
        tagline: "",
      });

      setSuccessMsg("✅ Profile deleted successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to delete profile", error);
    }
  };

  return (
    <div>
      <h3>Admin – Manage Profile</h3>

      {/* FORM */}
      <div className="admin-card">
        {successMsg && <div className="success-message">{successMsg}</div>}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            required
          />

          <label>Title</label>
          <input
            name="title"
            value={profile.title}
            onChange={handleChange}
            required
          />

          <label>Experience</label>
          <input
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            required
          />

          <label>Tagline</label>
          <textarea
            name="tagline"
            value={profile.tagline}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {savedProfile ? "Update Profile" : "Save Profile"}
          </button>
        </form>
      </div>

      {/* EXISTING PROFILE */}
      {savedProfile && (
        <div className="admin-card" style={{ marginTop: "30px" }}>
          <h4>Current Profile</h4>

          <p><strong>{savedProfile.fullName}</strong></p>
          <p>{savedProfile.title}</p>

          <button className="delete-btn" onClick={deleteProfile}>
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
}
