import React, { useState, useEffect } from "react";
import { guardiansPageStyles as styles } from './guardiansPage.styles';
import { Apoderados, RegisterUser } from '../../services/services.types';
import { mostrarApoderados, eliminarApoderado, updateApoderado, registerApoderado, registerUser } from '../../services/auth.service';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase-config';

const GuardiansPage: React.FC = () => {
  const [apoderados, setApoderados] = useState<Apoderados[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
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



  const message = successMessage || error;
  console.log(message);

  const [usuario, setUsuario] = useState<NuevoUsuario>({
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const cargarDatos = async () => {
    try {
      const respuesta = await mostrarApoderados();
      if (respuesta.data) {
        setApoderados(respuesta.data);
      }
    } catch (error) {
      console.error("Error al cargar los apoderados:", error);
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
    try {
      const response = await updateApoderado(updatedData);
      if (!response.success) {
        throw new Error('Error al actualizar el Apoderado');
      }
      setSuccessMessage("Apoderado actualizado exitosamente");
      setEditingApoderado(null);
      cargarDatos();
      closeModal();
    } catch (error) {
      setError("Error al actualizar el Apoderado");
    }
  };

  const handleDeleteApoderado = async (id: string) => {
    try {
      const response = await eliminarApoderado({ id });
      if (!response.success) {
        throw new Error('Error al eliminar el Apoderado');
      }

      setSuccessMessage("Apoderado eliminado exitosamente");
      cargarDatos();
    } catch (error) {
      setError("Error al eliminar el Apoderado");
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedApoderadoId(prevId => (prevId === id ? null : id));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredApoderado = apoderados.filter(apoderado =>
    (filter.firstName ? apoderado.nombre.includes(filter.firstName) : true) &&
    (filter.lastName ? apoderado.apellido.includes(filter.lastName) : true)
  );

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
      setError("Por favor, ingresa un nombre y apellido.");
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

      const dataUser: RegisterUser = {
        id: user.uid,
        nombre: newApoderado.nombre,
        apellido: newApoderado.apellido,
        rol: 'apoderado',
        uid: user.uid
      }

      await registerApoderado({ id: user.uid, nombre: newApoderado.nombre, apellido: newApoderado.apellido });
      await registerUser(dataUser);

      await sendEmailVerification(user);
      setSuccessMessage("Apoderado agregado exitosamente");
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
        <img src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media" alt="Logo Colegio" style={styles.schoolImage} />
      </header>
      <div style={styles.body as React.CSSProperties}>
        <button style={styles.backButton} onClick={() => window.history.back()}>Volver al menú</button>
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
