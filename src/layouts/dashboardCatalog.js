import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../src/assets/css/layouts.css";
import Productos from "../components/Productos";


function DashboardLayout() {
  const [admin, setAdmin] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(!admin);
  const location = useLocation(); 
  const navigate = useNavigate();
  const { tipo } = useParams(); 
  const [busqueda, setBusqueda] = useState(""); 


  // Cerrar sesión automáticamente al navegar
  useEffect(() => {
    if (admin) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Cada vez que cambia la ruta

  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(false);
    setShowLogin(true);
  };

  return (
    <div className="layout-container">
      <header className="header">
        <h1 className="logo">Catálogo Administrador</h1>
        <nav>
          {admin && (
            <button className="btn-danger" onClick={logout}>
              Cerrar sesión
            </button>
          )}
          <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
              Editar Productos
            </button>
        </nav>

      </header>

       <main className="main-contentCatalog">
        <div className="catalog-header">
          <h2>
            Catálogo {tipo ? `- ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}` : ""}
          </h2>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="catalog-search"
          />
        </div>

        {/* Pasamos el filtro de tipo y búsqueda al componente Productos */}
        <Productos filtroTipo={tipo} filtroNombre={busqueda} />
      </main>

      <footer className="footer">© 2025 La Orejona</footer>
    </div>
  );
}

export default DashboardLayout;
