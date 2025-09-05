import { useState } from "react";
import API from "../api";

function AdminLogin({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await API.post("/admin/login", { usuario, password });
      localStorage.setItem("token", res.data.token);
      setMsg("Login exitoso ✅");
      if (onLogin) onLogin();
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.msg || "Error en la conexión"));
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Login Administrador</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        {msg && (
          <p
            style={{
              color: msg.startsWith("Error") ? "#d9534f" : "#28a745",
              marginTop: "10px",
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "25px",
    color: "black",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "black",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default AdminLogin;
