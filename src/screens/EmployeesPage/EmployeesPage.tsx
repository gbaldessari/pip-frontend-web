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
  const [filter, setFilter] = useState({ nombre: '', apellido: '' });
  const [editingProfesor, setEditingProfesor] = useState<Profesor | null>(null);
  const [newProfesor, setNewProfesor] = useState<Profesor>({ id: '', nombre: '', apellido: '', asignaturas: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [usuario, setUsuario] = useState<NuevoUsuario>({
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const cargarDatos = async () => {
      const respuesta = await mostrarProfesores();
      if (respuesta.data) {
        setProfesores(respuesta.data);
      }
      else{
      alert("Error al cargar los profesores");}
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const openModal = () => {
    setNewProfesor({ id: '', nombre: '', apellido: '', asignaturas: [] });
    setEditingProfesor(null);
    setModalIsOpen(true);
  };

  const handleEditProfesor = (profesor: Profesor) => {
    setEditingProfesor(profesor);
    setNewProfesor(profesor);
    setModalIsOpen(true);
  };

  const handleUpdateProfesor = async () => { };

  const handleDeleteProfesor = async (id: string) => {
    const response = await eliminarProfesor({ id });
    if (!response.success) {
      alert("Error al eliminar el Profesor");
      return;
    }
    alert("Profesor eliminado exitosamente");
    cargarDatos();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredProfesores = Array.isArray(profesores)
    ? profesores.filter(profesor =>
      (filter.nombre ? profesor.nombre.includes(filter.nombre) : true) &&
      (filter.apellido ? profesor.apellido.includes(filter.apellido) : true)
    )
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProfesor({ ...newProfesor, [name]: value });
  };

  const handleInputUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleAddProfesor = async () => {
    if (!newProfesor.nombre || !newProfesor.apellido || usuario.correo === '' || usuario.contraseña === '' || usuario.confirmarContraseña === '') {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    if (usuario.contraseña !== usuario.confirmarContraseña) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, usuario.correo, usuario.contraseña);
    if (!userCredential.user) {
      alert('Error al crear el usuario');
      return;
    }
    const usuarioCreado = userCredential.user;

    const dataUser: RegisterUser = {
      id: usuarioCreado.uid,
      nombre: newProfesor.nombre,
      apellido: newProfesor.apellido,
      rol: "profesor",
      uid: usuarioCreado.uid
    };

    const responseRegisterProfesor = await registerProfesores({ id: usuarioCreado.uid, nombre: newProfesor.nombre, apellido: newProfesor.apellido });
    if (!responseRegisterProfesor.data) {
      alert('Error al registrar el profesor');
      return;
    }

    const responseRegisterUser = await registerUser(dataUser);
    if (!responseRegisterUser.success) {
      alert('Error al registrar el usuario');
      return;
    }
    await sendEmailVerification(usuarioCreado);
    alert("Profesor agregado exitosamente");
    cargarDatos();
    closeModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingProfesor(null);
    setNewProfesor({ id: '', nombre: '', apellido: '', asignaturas: [] });
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Gestión de Empleados</h1>
      </header>
      <div style={styles.body as React.CSSProperties}>
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
            <input type="text" name="nombre" value={newProfesor.nombre} onChange={handleInputChange} placeholder="Nombre" style={styles.input as React.CSSProperties} />
            <input type="text" name="apellido" value={newProfesor.apellido} onChange={handleInputChange} placeholder="Apellido" style={styles.input as React.CSSProperties} />
            {!editingProfesor && (
              <>
                <input type="text" name="correo" value={usuario.correo} onChange={handleInputUsuarioChange} placeholder="Correo" style={styles.input as React.CSSProperties} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type={isPasswordVisible ? 'text' : 'password'} name="contraseña" value={usuario.contraseña} onChange={handleInputUsuarioChange} placeholder="Contraseña" style={styles.input as React.CSSProperties} />
                  <button onClick={togglePasswordVisibility}>{isPasswordVisible ? '☠️' : '👁️'}</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type={isConfirmPasswordVisible ? 'text' : 'password'} name="confirmarContraseña" value={usuario.confirmarContraseña} onChange={handleInputUsuarioChange} placeholder="Confirmar Contraseña" style={styles.input as React.CSSProperties} />
                  <button onClick={toggleConfirmPasswordVisibility}>{isConfirmPasswordVisible ? '☠️' : '👁️'}</button>
                </div>
              </>
            )}
            <div style={styles.modalActions as React.CSSProperties}>
              {editingProfesor ? (
                <button style={styles.updateButton} onClick={handleUpdateProfesor}>Actualizar Profesor</button>
              ) : (
                <button style={styles.addButton} onClick={handleAddProfesor}>Agregar Profesor</button>
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
