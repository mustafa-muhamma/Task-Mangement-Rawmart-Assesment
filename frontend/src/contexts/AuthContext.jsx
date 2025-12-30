import { createContext, useState, useContext } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initialize state directly from service/storage
    const [token, setToken] = useState(AuthService.getToken());
    // Note: Persisting user object would require an endpoint like auth/me or storing it in localStorage
    // For now, we decode or just check token existence.
    const [user, setUser] = useState(AuthService.getUser());
    const [loading, setLoading] = useState(false);

    // In a real app, you would fetchCurrentUser() here locally or from API
    // useEffect(() => { if(token) fetchUser() }, [token])

    const login = async (email, password) => {
        const data = await AuthService.login(email, password);
        setToken(data.token);
        setUser(data.user);
        return data.user;
    };

    const register = async (name, email, password) => {
        await AuthService.register(name, email, password);
        // Auto-login
        return await login(email, password);
    };

    const logout = () => {
        AuthService.logout();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
