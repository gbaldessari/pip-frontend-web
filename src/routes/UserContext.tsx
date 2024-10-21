import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase-config'; // Ajusta la ruta según tu estructura
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

// Define la interfaz para el usuario
interface User {
    uid: string;
    email: string;
    rol?: string; // Rol es opcional aquí
}

// Define la interfaz para el contexto
interface UserContextType {
    user: User | null;
    loading: boolean;
    fetchUserData: (uid: string) => Promise<void>; // Nueva función para buscar datos del usuario
}

// Crea el contexto con un valor por defecto
const UserContext = createContext<UserContextType | null>(null);

// Define la interfaz para las props del UserProvider
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Estado de autenticación cambiado:", currentUser);
            setLoading(false); // Cambia loading a false cuando la autenticación cambia

            if (currentUser) {
                setUser({ uid: currentUser.uid, email: currentUser.email || '' }); // Guarda solo uid y email por ahora
            } else {
                setUser(null); // No hay usuario autenticado
            }
        });

        return () => unsubscribe();
    }, []);

    // Nueva función para buscar el documento del usuario en Firestore
    const fetchUserData = async (uid: string) => {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "user", uid));
        if (userDoc.exists()) {
            setUser((prev) => ({ ...prev!, rol: userDoc.data().rol })); // Actualiza el rol del usuario
        } else {
            console.log("No se encontró el documento del usuario");
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
