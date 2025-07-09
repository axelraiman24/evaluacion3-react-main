import { useState, useEffect } from "react";

import "./App.css"; 

import "./App.css";


function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [promedio, setPromedio] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("alumnos");
    if (data) {
      setAlumnos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
  }, [alumnos]);

  const escala = (valor) => {
    const promedio = parseFloat(valor);
    if (promedio >= 1 && promedio <= 3.9) return "Insuficiente";
    if (promedio >= 4.0 && promedio <= 5.5) return "Mejorable";
    if (promedio >= 5.6 && promedio <= 6.4) return "Satisfactorio";
    if (promedio >= 6.5 && promedio <= 7.0) return "Espectacular";
    return "Promedio inválido";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !asignatura || !promedio) {
      alert("Completa todos los campos");
      return;
    }

    const promedioFloat = parseFloat(promedio);
    if (promedioFloat < 1 || promedioFloat > 7) {
      alert("El promedio debe estar entre 1.0 y 7.0");
      return;
    }

    const nuevo = { nombre, asignatura, promedio: promedioFloat };

    if (editIndex !== null) {
      const copia = [...alumnos];
      copia[editIndex] = nuevo;
      setAlumnos(copia);
      setEditIndex(null);
    } else {
      setAlumnos([...alumnos, nuevo]);
    }

    setNombre("");
    setAsignatura("");
    setPromedio("");
  };

  const handleEdit = (index) => {
    const a = alumnos[index];
    setNombre(a.nombre);
    setAsignatura(a.asignatura);
    setPromedio(a.promedio);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setAlumnos(alumnos.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Evaluación de Alumnos</h1>

      <form className="formulario-vertical" onSubmit={handleSubmit}>
        <input
          placeholder="Nombre del Alumno"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Asignatura"
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
        />
        <input
          type="number"
          step="0.1"
          placeholder="Promedio entre (1.0 - 7.0)"
          value={promedio}
          onChange={(e) => setPromedio(e.target.value)}
        />
        <button type="submit">
          {editIndex !== null ? "Actualizar" : "Agregar Alumno"}
        </button>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Asignatura</th>
            <th>Promedio</th>
            <th>Escala</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a, i) => (
            <tr key={i}>
              <td>{a.nombre}</td>
              <td>{a.asignatura}</td>
              <td>{a.promedio}</td>
              <td>{escala(a.promedio)}</td>
              <td>
                <button onClick={() => handleEdit(i)}>Editar</button>
                <button onClick={() => handleDelete(i)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
