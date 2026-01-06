import{Link, Outlet} from "react-router-dom";
import "../styles/AdminDashboard.css";

export default function AdminDashboard(){

return(
<div className="admin-layout">
    <aside>
    <h2>Admin Panel</h2>
        <nav>
          <Link to="summary">Summary</Link>
          <Link to="skills">Skills</Link>
          <Link to="projects">Projects</Link>
          <Link to="profile">Profile</Link>
        </nav>
</aside>
    {/* CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
</div>

);
}