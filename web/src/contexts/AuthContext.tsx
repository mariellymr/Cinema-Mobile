import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { IUsuario } from '../models/usuario.model';
import api from '../services/api';

interface AuthContextType {
    user: IUsuario | null;
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUsuario | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('@cinema:token');
        const storedUser = localStorage.getItem('@cinema:user');
        
        if (storedToken && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                // Define the default authorization header for future requests
                api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            } catch (error) {
                localStorage.removeItem('@cinema:token');
                localStorage.removeItem('@cinema:user');
            }
        }
    }, []);

    const login = async (email: string, senha: string) => {
        try {
            const response = await api.post('/auth/login', { email, password: senha });
            
            if (response.status === 200 || response.status === 201) {
                const { access_token, user: userData } = response.data;
                
                localStorage.setItem('@cinema:token', access_token);
                localStorage.setItem('@cinema:user', JSON.stringify(userData));
                
                api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                
                setUser(userData);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro no login:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('@cinema:token');
        localStorage.removeItem('@cinema:user');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
