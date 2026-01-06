import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 Auth state
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // USER | ADMIN
  const isLoggedIn = !!token;

  // 📱 Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  /* =========================
     SCROLL LOCK (MOBILE SAFE)
  ========================= */
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =========================
     AUTO CLOSE ON ROUTE CHANGE
  ========================= */
  useEffect(() => {
    setMenuOpen(false);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, [location.pathname]);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>MyPortfolio</Link>
      </div>

      {/* HAMBURGER ICON */}
      <div
        className="mobile-menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* MENU */}
      <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/summary" onClick={closeMenu}>Summary</Link></li>
        <li><Link to="/skills" onClick={closeMenu}>Skills</Link></li>
        <li><Link to="/projects" onClick={closeMenu}>Projects</Link></li>

        {/* GUEST */}
        {!isLoggedIn && (
          <>
            <li><Link to="/auth" onClick={closeMenu}>Login</Link></li>
            <li className="signup-btn">
              <Link to="/auth" onClick={closeMenu}>Signup</Link>
            </li>
          </>
        )}

        {/* USER */}
        {isLoggedIn && role === "USER" && (
          <li className="logout-btn" onClick={handleLogout}>
            Logout
          </li>
        )}

        {/* ADMIN */}
        {isLoggedIn && role === "ADMIN" && (
          <>
            <li className="admin-btn">
              <Link to="/admin/summary" onClick={closeMenu}>Admin</Link>
            </li>
            <li className="logout-btn" onClick={handleLogout}>
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
