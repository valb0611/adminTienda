import React, { useEffect, useState } from "react";
import API from "../api";
import Carousel from "../components/Carousel";
import "../../src/assets/css/admin.css"; // 🔹 vuelve a traer los estilos

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    tipo: "",
    imagenes: [],
  });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");

  // Cargar productos y tipos al iniciar
  useEffect(() => {
    cargarProductos();
    cargarTipos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await API.get("/productos");
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  };

  const cargarTipos = async () => {
    try {
      const res = await API.get("/tipos");
      setTipos(res.data);
    } catch (err) {
      console.error("Error al cargar tipos:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagenes: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("nombre", form.nombre);
      fd.append("descripcion", form.descripcion);
      fd.append("precio", form.precio);
      fd.append("tipo", form.tipo);
      form.imagenes.forEach((img) => fd.append("imagenes", img));

      if (editId) {
        await API.put(`/productos/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMsg("✅ Producto actualizado correctamente");
      } else {
        await API.post("/productos", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMsg("✅ Producto creado correctamente");
      }

      setForm({ nombre: "", descripcion: "", precio: "", tipo: "", imagenes: [] });
      setEditId(null);
      cargarProductos();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      setMsg("❌ Error al guardar producto");
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await API.delete(`/productos/${id}`);
      setMsg("✅ Producto eliminado");
      cargarProductos();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      setMsg("❌ Error al eliminar producto");
    }
  };

  const editar = (p) => {
    setEditId(p._id);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      tipo: p.tipo?._id || "",
      imagenes: p.imagenes || [],
    });
  };

  return (
    <div className="admin-container">
      <h2>Gestión de Productos</h2>

      <div className="form-preview-container">
        {/* Formulario */}
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
          <input
            name="precio"
            type="number"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            required
          />
          <select name="tipo" value={form.tipo} onChange={handleChange} required>
            <option value="">-- Selecciona un tipo --</option>
            {tipos.map((t) => (
              <option key={t._id} value={t._id}>
                {t.nombre}
              </option>
            ))}
          </select>
          <input type="file" multiple onChange={handleFileChange} />

          <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
        </form>

        {/* Vista previa del producto en edición */}
        <div className="producto-card">
          {form.imagenes.length > 0 && (
            <Carousel
              imagenes={form.imagenes.map((img) =>
                img instanceof File ? URL.createObjectURL(img) : img
              )}
            />
          )}
          <div className="producto-info">
            <h3>{form.nombre || "Nombre del producto"}</h3>
            <p>{tipos.find((t) => t._id === form.tipo)?.nombre || "Categoría"}</p>
            <p className="producto-descripcion">
              {form.descripcion || "Descripción del producto"}
            </p>
            <p className="producto-precio">₡{form.precio || "0"}</p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      {msg && (
        <p
          style={{
            marginTop: "10px",
            color: msg.includes("❌") ? "#d9534f" : "#28a745",
          }}
        >
          {msg}
        </p>
      )}

      <hr />

      {/* Lista de productos */}
      <div className="productos-grid">
        {productos.map((p) => (
          <div key={p._id} className="producto-card">
            <Carousel imagenes={p.imagenes || []} />
            <div className="producto-info">
              <h3>{p.nombre}</h3>
              <p>{p.tipo?.nombre}</p>
              <p>{p.descripcion}</p>
              <p className="producto-precio">₡{p.precio}</p>
            </div>
            <div className="admin-actions">
              <button className="editar" onClick={() => editar(p)}>
                Editar
              </button>
              <button className="eliminar" onClick={() => eliminar(p._id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductos;
