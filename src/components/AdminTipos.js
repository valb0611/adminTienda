import { useEffect, useState } from "react";
import API from "../api";
import "../../src/assets/css/admin.css";

function AdminTipos() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ nombre: "" });
  const [editando, setEditando] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    try {
      const res = await API.get("/tipos");
      setTipos(res.data);
    } catch (err) {
      console.error("Error cargando tipos:", err);
      setMsg("Error cargando tipos ❌");
    }
  };

  const guardarTipo = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      if (editando) {
        await API.put(`/tipos/${editando}`, form);
        setMsg("Tipo actualizado ✅");
      } else {
        await API.post("/tipos", form);
        setMsg("Tipo agregado ✅");
      }
      setForm({ nombre: "" });
      setEditando(null);
      cargarTipos();
    } catch (err) {
      console.error(err);
      setMsg("Error al guardar tipo ❌");
    }
  };

  const editarTipo = (tipo) => {
    setForm({ nombre: tipo.nombre });
    setEditando(tipo._id);
  };

  const eliminarTipo = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este tipo?")) return;
    try {
      await API.delete(`/tipos/${id}`);
      setMsg("Tipo eliminado ✅");
      cargarTipos();
    } catch (err) {
      console.error(err);
      setMsg("Error al eliminar tipo ❌");
    }
  };

  return (
    <div className="admin-container">
      <h2>Gestión de Tipos</h2>

      <form className="admin-form" onSubmit={guardarTipo}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <button type="submit">{editando ? "Actualizar" : "Agregar"} Tipo</button>
        {editando && (
          <button
            type="button"
            className="cancelar"
            onClick={() => { setEditando(null); setForm({ nombre: "" }); }}
          >
            Cancelar
          </button>
        )}
      </form>

      {msg && <p style={{ marginTop: "10px", color: msg.includes("❌") ? "#d9534f" : "#28a745" }}>{msg}</p>}

      <div className="admin-list">
        {tipos.map((t) => (
          <div key={t._id} className="tipo-card">
            <div className="tipo-info">
              <h3>{t.nombre}</h3>
            </div>
            <div className="admin-actions">
              <button className="editar" onClick={() => editarTipo(t)}>Editar</button>
              <button className="eliminar" onClick={() => eliminarTipo(t._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTipos;
