import React, { useState } from 'react';
import '../styles/Registro.css';

function Registro() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Usuario:', usuario, 'Contraseña:', password);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      <label>
        Usuario:
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Registro;
