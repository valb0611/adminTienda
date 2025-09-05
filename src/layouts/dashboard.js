import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";
import AdminProductos from "../components/AdminProductos";
import AdminTipos from "../components/AdminTipos";
import "../../src/assets/css/layouts.css";

function DashboardLayout() {
  const [admin, setAdmin] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(!admin);
  const navigate = useNavigate();



  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(false);
    setShowLogin(true);
  };

  return (
    <div className="layout-container">
      <header className="header">
        <h1 className="logo">Sistema de Productos</h1>
        <nav>
          {admin && (
            <button className="btn-danger" onClick={logout}>
              Cerrar sesión
            </button>
          )}
          <button className="btn-secondary" onClick={() => navigate("/dashboardCatalog")}>
              Ver Catálogo 
            </button>
        </nav>

      </header>

      <main className="main-content">
        {!admin && showLogin ? (
          <div className="modal-overlay">
            <div className="modal">
              <AdminLogin
                onLogin={() => {
                  setAdmin(true);
                  setShowLogin(false);
                }}
              />
            </div>
          </div>
        ) : admin ? (
          <div className="dashboard-content">
            <AdminTipos />
            <hr />
            <AdminProductos />
          </div>
        ) : null}
      </main>

      <footer className="footer">© 2025 La Orejona</footer>
    </div>
  );
}

export default DashboardLayout;
