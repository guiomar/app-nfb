//GH
//AUTENTICACION. Este componente recopila la información del formulario de inicio de sesión. Mantiene el estado del deviceID, email y password. El componente acepta estas propiedades: 
//onLogin: se ejecuta al hacer click en Iniciar sesión
//loading: cuando el envío del formulario está en curso
//error: mensaje al haber error
import React, { useState } from "react";

export function LoginForm({ onLogin, loading, error, footerComponent }) {
  //const [deviceId, setDeviceId] = useState(""); CAPTURA
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    onLogin({ email, password }); //Aquí incluye deviceId. CAPTURA
  }

  return (
    <form className="card login-form" onSubmit={onSubmit}>
      <h3 className="card-heading">Login</h3>
      {!!error ? <h4 className="card-error">{error}</h4> : null}

      <div className="row">
        <label>Email</label>
        <input
          type="email"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="row">
        <label>Password</label>
        <input
          type="password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="row">
        <button type="submit" className="card-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      {footerComponent}
    </form>
  );
}