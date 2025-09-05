import React, { useEffect, useState } from "react";
import API from "../api";
import Carousel from "../components/Carousel";

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

  // Manejar inputs de texto
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar subida de imágenes
  const handleFileChange = (e) => {
    setForm({ ...form, imagenes: Array.from(e.target.files) });
  };

  // Enviar formulario (crear/editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        await API.post("/productos", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ nombre: "", descripcion: "", precio: "", tipo: "", imagenes: [] });
      setEditId(null);
      cargarProductos();
    } catch (err) {
      console.error("Error al guardar producto:", err);
    }
  };

  // Eliminar producto
  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await API.delete(`/productos/${id}`);
      cargarProductos();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  // Editar producto
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
    <div>
      <h2>Administrar Productos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="">-- Selecciona un tipo --</option>
          {tipos.map((t) => (
            <option key={t._id} value={t._id}>
              {t.nombre}
            </option>
          ))}
        </select>
        <input type="file" multiple onChange={handleFileChange} />

        {/* Vista previa de imágenes (locales o Cloudinary) */}
        {form.imagenes.length > 0 && (
          <Carousel
            imagenes={form.imagenes.map((img) =>
              img instanceof File ? URL.createObjectURL(img) : img
            )}
          />
        )}

        <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      </form>

      {/* Lista de productos */}
      <div className="productos-lista">
        {productos.map((p) => (
          <div key={p._id} className="producto-card">
            <h3>{p.nombre}</h3>
            <Carousel imagenes={p.imagenes || []} />
            <p>{p.descripcion}</p>
            <p>₡{p.precio}</p>
            <p>Tipo: {p.tipo?.nombre}</p>
            <button onClick={() => editar(p)}>Editar</button>
            <button onClick={() => eliminar(p._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductos;
