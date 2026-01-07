import { useEffect, useState } from "react";
import api, { createSummary, getSummary } from "../services/api";

export default function AdminSummary() {
  const [point, setPoint] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [summaryPoints, setSummaryPoints] = useState([]);

  // ================= FETCH SUMMARY =================
  const fetchSummary = async () => {
    try {
      const res = await getSummary();
      setSummaryPoints(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch summary", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  // ================= SAVE SUMMARY =================
  const saveSummary = async () => {
    if (!point.trim()) return;

    try {
      await createSummary({ point });

      setPoint("");
      setSuccessMsg("✅ Summary point saved successfully");
      fetchSummary();

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Failed to save summary", error);
    }
  };

  // ================= DELETE SUMMARY =================
  const deleteSummary = async (id) => {
    try {
      await deleteSummary(id);
      setSummaryPoints((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete summary", error);
    }
  };

  return (
    <div>
      <h3>Admin – Manage Summary</h3>

      {/* ADD SUMMARY */}
      <div className="admin-card">
        {successMsg && <div className="success-message">{successMsg}</div>}

        <textarea
          placeholder="Enter summary point"
          value={point}
          onChange={(e) => setPoint(e.target.value)}
        />

        <button onClick={saveSummary}>Save Summary</button>
      </div>

      {/* LIST SUMMARY */}
      <div className="admin-card" style={{ marginTop: "30px" }}>
        <h4>Summary Points</h4>

        {summaryPoints.length === 0 && <p>No summary added yet.</p>}

        <ul className="admin-summary-list">
          {summaryPoints.map((item) => (
            <li key={item.id} className="admin-summary-item">
              <span>{item.point}</span>

              <button
                className="delete-btn"
                onClick={() => deleteSummary(item.id)}
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
