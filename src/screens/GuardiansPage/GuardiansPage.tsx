import React, { useState, useEffect } from "react";
import { guardiansPageStyles as styles } from './guardiansPage.styles';
import { Apoderados, RegisterUser } from '../../services/services.types';
import { mostrarApoderados, eliminarApoderado, updateApoderado, registerApoderado, registerUser } from '../../services/auth.service';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase-config';

const GuardiansPage: React.FC = () => {
  const [apoderados, setApoderados] = useState<Apoderados[]>([]);
  const [filter, setFilter] = useState({ firstName: '', lastName: '' });
  const [editingApoderado, setEditingApoderado] = useState<Apoderados | null>(null);
  const [newApoderado, setNewApoderado] = useState<Apoderados>({ nombre: '', apellido: '', id: '', alumnos: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expandedApoderadoId, setExpandedApoderadoId] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  type NuevoUsuario = {
    correo: string;
    contraseña: string;
    confirmarContraseña: string;
  };

  const [usuario, setUsuario] = useState<NuevoUsuario>({
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const cargarDatos = async () => {

    const respuesta = await mostrarApoderados();
    if (Array.isArray(respuesta.data)) {
      setApoderados(respuesta.data);
    } else {
      setApoderados([]);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const openModal = () => {
    setNewApoderado({ nombre: '', apellido: '', id: '', alumnos: [] });
    setEditingApoderado(null);
    setModalIsOpen(true);
  };

  const handleEditApoderado = (apoderado: Apoderados) => {
    setEditingApoderado(apoderado);
    setNewApoderado({ nombre: '', apellido: '', id: '', alumnos: [] });
    setModalIsOpen(true);
  };

  const handleUpdateApoderado = async () => {
    if (!editingApoderado) return;

    const updatedData = {
      id: editingApoderado.id,
      nombre: newApoderado.nombre,
      apellido: newApoderado.apellido,
    };

    const response = await updateApoderado(updatedData);
    if (!response.success) {
      alert('Error al actualizar el Apoderado');
    }
    else {
      setEditingApoderado(null);
      cargarDatos();
      closeModal();
    }
  };

  const handleDeleteApoderado = async (id: string) => {

    const response = await eliminarApoderado({ id });
    if (!response.success) {
      alert('Error al eliminar el Apoderado');
    }
    else {
      cargarDatos();
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedApoderadoId(prevId => (prevId === id ? null : id));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredApoderado = Array.isArray(apoderados) ? apoderados.filter(apoderado =>
    (filter.firstName ? apoderado.nombre.includes(filter.firstName) : true) &&
    (filter.lastName ? apoderado.apellido.includes(filter.lastName) : true)
  ) : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewApoderado({ ...newApoderado, [name]: value });
  };

  const handleInputUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  }

  const handleAddApoderado = async () => {
    if (!newApoderado.nombre || !newApoderado.apellido) {
      console.error('Por favor, ingresa un nombre y apellido.');
      return;
    }
    if (usuario.correo === '' || usuario.contraseña === '' || usuario.confirmarContraseña === '') {
      console.error('Por favor, ingresa un correo y contraseña.');
      return;
    }
    if (usuario.contraseña !== usuario.confirmarContraseña) {
      console.error('Las contraseñas no coinciden.');
      return;
    }
    const userCredential = await createUserWithEmailAndPassword(auth, usuario.correo, usuario.contraseña);
    const user = userCredential.user;

    const dataUser: RegisterUser = {
      id: user.uid,
      nombre: newApoderado.nombre,
      apellido: newApoderado.apellido,
      rol: 'apoderado',
      uid: user.uid
    }

    const response = await registerApoderado({ id: user.uid, nombre: newApoderado.nombre, apellido: newApoderado.apellido });
    if (response.data) {
      const responseRegister = await registerUser(dataUser);
      if (responseRegister.data) {
        await sendEmailVerification(user);
        cargarDatos();
        closeModal();
      }
      else {
        alert('Error al registrar el Usuario');
      }
    }
    else {
      alert('Error al registrar el Apoderado');
    }
  };



  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);



  const closeModal = () => {
    setModalIsOpen(false);
    setEditingApoderado(null);
    setNewApoderado({ nombre: '', apellido: '', id: '', alumnos: [] });
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Gestión de Apoderados</h1>
      </header>
      <div style={styles.body as React.CSSProperties}>
        <div style={styles.filterContainer as React.CSSProperties}>
          <input
            type="text"
            name="firstName"
            value={filter.firstName}
            onChange={handleFilterChange}
            placeholder="Nombre"
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            name="lastName"
            value={filter.lastName}
            onChange={handleFilterChange}
            placeholder="Apellido"
            style={styles.filterInput as React.CSSProperties}
          />
          <button style={styles.addButton} onClick={openModal}>Agregar Apoderado</button>
        </div>

        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead as React.CSSProperties}>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Estudiantes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            {filteredApoderado.map((apoderado) => (
              <tr key={apoderado.id}>
                <td>{apoderado.nombre}</td>
                <td>{apoderado.apellido}</td>
                <td>
                  {Array.isArray(apoderado.alumnos) && apoderado.alumnos.length > 0 ? (
                    <>
                      <button onClick={() => toggleExpanded(apoderado.id)}>
                        {expandedApoderadoId === apoderado.id ? 'Ocultar estudiantes' : 'Mostrar estudiantes'}
                      </button>
                      {expandedApoderadoId === apoderado.id && (
                        <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                          {apoderado.alumnos.map((alumno) => (
                            <li key={alumno.id}>
                              {alumno.nombre} {alumno.apellido}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <button disabled style={{ cursor: 'default', color: '#888' }}>
                      No hay alumnos vinculados
                    </button>
                  )}
                </td>
                <td>
                  <button style={styles.editButton} onClick={() => handleEditApoderado(apoderado)}>Editar</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteApoderado(apoderado.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalIsOpen && (
          <div style={styles.modalOverlay as React.CSSProperties}>
            <div style={styles.modalContent as React.CSSProperties}>
              <h2>{editingApoderado ? "Editar Apoderado" : "Agregar Apoderado"}</h2>
              {editingApoderado ? (
                <>
                  <input
                    type="text"
                    name="nombre"
                    value={newApoderado.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    style={styles.input as React.CSSProperties}
                  />

                  <input
                    type="text"
                    name="apellido"
                    value={newApoderado.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellido"
                    style={styles.input as React.CSSProperties}
                  />

                </>
              ) : (

                <>
                  <input
                    type="text"
                    name="nombre"
                    value={newApoderado.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    style={styles.input as React.CSSProperties}
                  />
                  <input
                    type="text"
                    name="apellido"
                    value={newApoderado.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellido"
                    style={styles.input as React.CSSProperties}
                  />
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
              <div style={styles.modalActions as React.CSSProperties}>
                {editingApoderado ? (
                  <button style={styles.updateButton} onClick={handleUpdateApoderado}>Actualizar Apoderado</button>
                ) : (
                  <button style={styles.addButton} onClick={handleAddApoderado}>Agregar Apoderado</button>
                )}
                <button style={styles.cancelButton} onClick={closeModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuardiansPage;
