import React, { useState } from 'react';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePassChange = (event) => setPass(event.target.value);


  const insertarUsuario = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/project-practice/backend/public/index.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', name, email, pass })
      });

      const data = await response.json();
      setMensaje(data.message);
      setLoading(false);
      setName(''); // Limpiar el formulario
      setEmail(''); // Limpiar el formulario
      setPass(''); // Limpiar el formulario 
    } catch (error) {
      setMensaje('Error al agregar el usuario', data );
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Insertar Usuario</h1>
      <form onSubmit={insertarUsuario}>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={handleNameChange}
          required
        />
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={pass}
          onChange={handlePassChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Usuario'}
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AddUser;
