import React, {useState, useEffect} from "react";

function Card(){
    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
      fetch('http://localhost:8080/project-practice/backend/public/index.php', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => setUsuarios(data))
        .catch(error => console.error('Error:', error));
    }, []);
    
    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
              {usuarios.map(usuario => (
                <li key={usuario.id}>
                  {usuario.name} - {usuario.email}
                </li>
              ))}
            </ul>
        </div>
    );
}

export default Card;
