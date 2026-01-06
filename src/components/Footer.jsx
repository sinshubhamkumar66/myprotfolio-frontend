import "../styles/Footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h3>MyPortfolio</h3>
          <p>Java Full Stack Engineer | Spring Boot | React</p>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <a href="/">Home</a>
          <a href="/summary">Summary</a>
          <a href="/skills">Skills</a>
          <a href="/projects">Projects</a>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <p>📧 shubham@example.com</p>
          <p>📍 India</p>

          {/* SOCIAL LINKS */}
          <div className="social-links">
            <a href="https://www.linkedin.com/in/shubham-kumar-singh-ab4a7216a/" target="_blank">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://github.com/sinshubhamkumar66" target="_blank">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Shubham Singh. All rights reserved.
      </div>
    </footer>
  );
}
