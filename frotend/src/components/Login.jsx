import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();// Para redirigir

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const verificarUsuario = (event) => {
    event.preventDefault();
    setLoading(true); // Activar el estado de carga

    fetch('http://localhost:8080/project-practice/backend/public/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({action: 'check', email })
    })
      .then(response => response.json())
      .then(data => {
        setMensaje(data.message);
        setLoading(false); // Desactivar el estado de carga
        if (data.message === "Usuario encontrado") {
          // console.log(data.message)
          navigate('/Card');
        }
      })
      .catch(error => {
        setMensaje('Error al verificar el usuario');
        setLoading(false); // Desactivar el estado de carga en caso de error
      });
  };

  return (
    <div>
      <h1>Verificar Usuario</h1>
      <form onSubmit={verificarUsuario}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Verificar</button>
      </form>
      {loading ? (
        <p>Cargando...</p> // Mostrar mensaje de carga mientras se espera la respuesta
      ) : (
        mensaje && <p>{mensaje}</p> // Mostrar el mensaje si no está cargando
      )}
    </div>
  );
}

export default Login;
