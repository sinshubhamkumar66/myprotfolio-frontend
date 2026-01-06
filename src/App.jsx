import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SummaryPage from "./pages/SummaryPage";
import SkillsPage from "./pages/SkillsPage";
import Auth from "./components/Auth";

import AdminDashboard from "./components/AdminDashboard";
import AdminSummary from "./pages/AdminSummary";
import AdminProfile from "./pages/AdminProfile";
import AdminSkill from "./pages/AdminSkill";
import AdminProject from "./pages/AdminProject";
import ProjectPage from "./pages/ProjectPage";    

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />

        <main className="app-content">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectPage />} />

            {/* ADMIN ROUTES */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roleRequired="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="summary" element={<AdminSummary />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="skills" element={<AdminSkill />} />
              <Route path="projects" element={<AdminProject />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
