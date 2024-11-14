import React, { useState, useEffect } from "react";
import { employeesPageStyles as styles } from './employeesPage.styles';
import { mostrarProfesores, eliminarProfesor, registerProfesores, registerUser } from '../../services/auth.service';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { Profesor, RegisterUser } from "../../services/services.types";
type NuevoUsuario = {
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
};

const EmployeesPage: React.FC = () => {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({nombre: '', apellido: '' });
  const [editingProfesor, setEditingProfesor] = useState<Profesor | null>(null);
  const [newProfesor, setNewProfesor] = useState<Profesor>({ id: '', nombre: '', apellido: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [usuario, setUsuario] = useState<NuevoUsuario>({
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const message = successMessage || error;
  console.log(message);

  const cargarDatos = async () => {
    try {
      const listaProfesores = await mostrarProfesores();
      setProfesores(listaProfesores);
    } catch (error) {
      console.error("Error al cargar los profesores:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const openModal = () => {
    setNewProfesor({ id: '', nombre: '', apellido: '' });
    setEditingProfesor(null);
    setModalIsOpen(true);
  };

  const handleEditProfesor = (profesor: Profesor) => {
    setEditingProfesor(profesor);
    setNewProfesor(profesor);
    setModalIsOpen(true);
  };

  
  const handleUpdateProfesor = async () => {
  };


  const handleDeleteProfesor = async (id: string) => {
    try {
      const response = await eliminarProfesor({ id });
      if (!response.success) {
        throw new Error('Error al eliminar el Profesor');
      }
      setSuccessMessage("Profesor eliminado exitosamente");
      cargarDatos();
    } catch (error) {
      setError("Error al eliminar el Profesor");
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredProfesores = profesores.filter(profesor =>
    (filter.nombre ? profesor.nombre.includes(filter.nombre) : true) &&
    (filter.apellido ? profesor.apellido.includes(filter.apellido) : true) 
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProfesor({ ...newProfesor, [name]: value });
  };

  const handleInputUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleAddProfesor = async () => {
    if (!newProfesor.nombre || !newProfesor.apellido) {
      setError("Por favor, ingresa todos los campos requeridos.");
      return;
    }
    if (usuario.correo === '' || usuario.contraseña === '' || usuario.confirmarContraseña === '') {
      setError("Por favor, ingresa un correo y contraseña.");
      return;
    }
    if (usuario.contraseña !== usuario.confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, usuario.correo, usuario.contraseña);
      const user = userCredential.user;

      const dataUser : RegisterUser = {
        id: user.uid,
        nombre: newProfesor.nombre,
        apellido: newProfesor.apellido,
        rol: "profesor",
        uid: user.uid
      };

      await registerProfesores({ id: user.uid, nombre: newProfesor.nombre, apellido: newProfesor.apellido});
      await registerUser(dataUser);
      await sendEmailVerification(user);

      setSuccessMessage("Profesor agregado exitosamente");
      cargarDatos();
      closeModal();
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Correo inválido.');
      } else {
        setError('Error al crear la cuenta: ' + err.message);
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingProfesor(null);
    setNewProfesor({ id: '', nombre: '', apellido: '' });
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);    




  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Gestión de Profesores</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media" alt="Logo Colegio" style={styles.schoolImage} />
      </header>
      <div style={styles.body as React.CSSProperties}>
        <button style={styles.backButton} onClick={() => window.history.back()}>Volver al menú</button>
        <div style={styles.filterContainer as React.CSSProperties}>
          <input type="text" name="firstName" value={filter.nombre} onChange={handleFilterChange} placeholder="Nombre" style={styles.filterInput as React.CSSProperties} />
          <input type="text" name="lastName" value={filter.apellido} onChange={handleFilterChange} placeholder="Apellido" style={styles.filterInput as React.CSSProperties} />
          <button style={styles.addButton as React.CSSProperties} onClick={openModal}>Agregar Profesor</button>
        </div>
  
        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead as React.CSSProperties}>
            <tr>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            {filteredProfesores.map((profesor) => (
              <tr key={profesor.id}>
                <td>Profesor</td>
                <td>{profesor.nombre}</td>
                <td>{profesor.apellido}</td>
                <td>
                  <button style={styles.editButton as React.CSSProperties} onClick={() => handleEditProfesor(profesor)}>Editar</button>
                  <button style={styles.deleteButton as React.CSSProperties} onClick={() => handleDeleteProfesor(profesor.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {modalIsOpen && (
        <div style={styles.modalOverlay as React.CSSProperties}>
          <div style={styles.modalContent as React.CSSProperties}>
            <h2>{editingProfesor ? "Editar Profesor" : "Agregar Profesor"}</h2>
            <>
              <input
                type="text"
                name="nombre"
                value={newProfesor.nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="apellido"
                value={newProfesor.apellido}
                onChange={handleInputChange}
                placeholder="Apellido"
                style={styles.input as React.CSSProperties}
              />
              {!editingProfesor && (
                <>
                  <input
                    type="text"
                    name="correo"
                    value={usuario.correo}
                    onChange={handleInputUsuarioChange}
                    placeholder="Correo"
                    style={styles.input as React.CSSProperties}
                  />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      name="contraseña"
                      value={usuario.contraseña}
                      onChange={handleInputUsuarioChange}
                      placeholder="Contraseña"
                      style={styles.input as React.CSSProperties}
                    />
                    <button onClick={togglePasswordVisibility}>
                      {isPasswordVisible ? '☠️' : '👁️'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      name="confirmarContraseña"
                      value={usuario.confirmarContraseña}
                      onChange={handleInputUsuarioChange}
                      placeholder="Confirmar Contraseña"
                      style={styles.input as React.CSSProperties}
                    />
                    <button onClick={toggleConfirmPasswordVisibility}>
                      {isConfirmPasswordVisible ? '☠️' : '👁️'}
                    </button>
                  </div>
                </>
              )}
            </>
            <div style={styles.modalActions as React.CSSProperties}>
              {editingProfesor ? (
                <button style={styles.updateButton} onClick={handleUpdateProfesor}>Actualizar Apoderado</button>
              ) : (
                <button style={styles.addButton} onClick={handleAddProfesor}>Agregar Apoderado</button>
              )}
              <button style={styles.cancelButton} onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default EmployeesPage;