import { useEffect, useState } from "react";
import { getSummary } from "../services/api";
import "../styles/SummaryPage.css";

export default function SummaryPage() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    getSummary().then(res => setSummary(res.data));
  }, []);

  return (
    <section className="summary-page">
      <div className="summary-container">
        <h1>Professional Summary</h1>
        <p className="summary-subtitle">
          A quick overview of my professional background and expertise
        </p>

        <div className="summary-list">
          {summary.map((item, index) => (
            <div className="summary-card" key={item.id}>
              <span className="summary-index">{index + 1}</span>
              <p>{item.point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
