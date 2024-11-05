import { auth } from '../firebase-config'; // Ajusta la ruta según tu estructura
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define la interfaz para el usuario
interface User {
    uid: string;
    apellido: string;
    email: string;
    nombre: string;
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
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    if (currentUser) {
                        console.log("Estado de autenticación cambiado:", currentUser);
                        setLoading(true);
                        fetchUserData(currentUser.uid);
                    } else {
                        setUser(null);
                        setLoading(false);
                    }
                });
                return () => unsubscribe();
            })
            .catch((error) => {
                console.error('Error al establecer la persistencia:', error);
                setLoading(false);
            });
    }, []);
    
    
    

    // Nueva función para buscar el documento del usuario en Firestore
    const fetchUserData = async (uid: string) => {
        setLoading(true); // Solo cuando hay un usuario autenticado
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "user", uid));
        if (userDoc.exists()) {
            setUser((prev) => ({
                ...prev!,
                nombre: userDoc.data().nombre || '',
                apellido: userDoc.data().apellido || '',
                rol: userDoc.data().rol 
            }));
        } else {
            console.log("No se encontró el documento del usuario");
        }
        setLoading(false);
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
