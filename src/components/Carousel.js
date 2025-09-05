import { useEffect, useRef, useState } from "react";
import "../../src/assets/css/catalog.css";

function Carousel({ imagenes = [] }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const [hover, setHover] = useState(false);

  // Avanzar automáticamente solo si el mouse está encima
  useEffect(() => {
    if (hover && imagenes.length > 1) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % imagenes.length);
      }, 2000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [hover, imagenes.length]);

  const goTo = (i) => setIndex(i);
  const prev = () => setIndex((i) => (i === 0 ? imagenes.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % imagenes.length);

  if (!imagenes || imagenes.length === 0) return null;

  return (
    <div
      className="carousel"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="carousel-images"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {imagenes.map((img, idx) => (
          <div className="carousel-item" key={idx}>
            <img
              src={img} // ✅ ya es URL completa de Cloudinary o blob local
              alt={`imagen-${idx}`}
              onError={(e) => (e.target.src = "/default-image.png")}
            />
          </div>
        ))}
      </div>

      {/* Flechas */}
      {imagenes.length > 1 && (
        <>
          <button className="carousel-arrow left" onClick={prev}>
            ❮
          </button>
          <button className="carousel-arrow right" onClick={next}>
            ❯
          </button>
        </>
      )}

      {/* Puntos */}
      <div className="carousel-nav">
        {imagenes.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === index ? "active" : ""}`}
            onClick={() => goTo(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
