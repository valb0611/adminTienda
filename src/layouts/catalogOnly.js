import { useState } from "react";
import Productos from "../components/Productos";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../src/assets/css/catalog.css";

function CatalogOnly() {
  const { tipo } = useParams(); 
  const [busqueda, setBusqueda] = useState(""); 
  const navigate = useNavigate();


  return (
    <div className="layout-containerCatalog">
      <header className="headerCatalog">
        <h1 className="logoCatalog"
        onClick={() => navigate("/")}>La Orejona</h1>
        <nav className="navCatalog">
          <Link to="/catalogo">Todo</Link>
          <Link to="/catalogo/infantiles">Infantiles</Link>
          <Link to="/catalogo/retro">Retro</Link>
          <Link to="/catalogo/femeninas">Femeninas</Link>
          <Link to="/catalogo/actuales">Actuales</Link>
          <Link to="/catalogo/especiales">Especiales</Link>
          <Link to="/catalogo/uniformes">Uniformes</Link>
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

      <footer className="footerCatalog">© 2025 La Orejona</footer>
    </div>
  );
}

export default CatalogOnly;
