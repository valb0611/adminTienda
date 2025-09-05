import Productos from "../components/Productos";
import { Link, useNavigate } from "react-router-dom";
import "../../src/assets/css/catalog.css";
import VideoLanding from "../../src/assets/videos/VideoLanding.mp4";
import Camisas from "../../src/assets/images/camisasmuchas.jpg";

function CatalogLayout() {
  const navigate = useNavigate();

  const scrollToCompra = () => {
    const section = document.querySelector(".compraSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* Hero con video y botones */}
      <section className="heroVideo">
        <video autoPlay loop muted playsInline className="videoBackground">
          <source src={VideoLanding} type="video/mp4" />
          Tu navegador no soporta video.
        </video>
        <div className="heroOverlay"></div>
        <div className="heroText">
          <h1>VIVE TU PASIÓN</h1>
          <p>Vístete de pasión y vive el fútbol</p>

          <div className="heroButtons">
            <button className="btnWhite" onClick={scrollToCompra}>
              Explorar
            </button>
            <button
              className="btnWhite"
              onClick={() => navigate("/catalogo")}
            >
              Ir al Catálogo
            </button>
          </div>
        </div>
      </section>

      {/* Sección compra */}
      <section className="compraSection">
        {/* Lado izquierdo con imagen */}
        <div
          className="compraImagen"
          style={{ backgroundImage: `url(${Camisas})` }}
        >
          <div className="compraTexto">
            <h2>Encuentra tu estilo</h2>
            <p>Tu camiseta, tu pasión, tu fútbol</p>
            <a
              href="https://wa.link/1cfs97"
              target="_blank"
              rel="noopener noreferrer"
              className="btnWhatsApp"
            >
              Escríbenos en WhatsApp
            </a>
          </div>
        </div>

        {/* Lado derecho con pasos */}
        <div className="compraInfo">
          <h2>Cómo Comprar</h2>
          <div className="paso">
            <h3>1. Contáctanos</h3>
            <p>Si te gustó alguno de nuestros productos, envíanos un mensaje.</p>
          </div>
          <div className="paso">
            <h3>2. Cancela el 50%</h3>
            <p>Selecciona el método de pago y confirma la compra con el 50%.</p>
          </div>
          <div className="paso">
            <h3>3. Entrega</h3>
            <p>Al cancelar el total, coordinamos la entrega de tu camiseta.</p>
          </div>
        </div>
      </section>

      <main className="main-contentCatalog">
        <h2>Catálogo</h2>
        <Productos />
      </main>

      <footer className="footerCatalog">© 2025 La Orejona</footer>
    </div>
  );
}

export default CatalogLayout;
