import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: (defaultRole?: UserRole) => void;
  closeLoginModal: () => void;
  defaultLoginRole: UserRole;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  quickLogin: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shambu_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('shambu_token'));
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('shambu_theme') as 'light' | 'dark') || 'light';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [defaultLoginRole, setDefaultLoginRole] = useState<UserRole>('student');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const role = user ? user.role : 'guest';

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('shambu_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('shambu_token', newToken);
    localStorage.setItem('shambu_user', JSON.stringify(newUser));
    addToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('shambu_token');
    localStorage.removeItem('shambu_user');
    addToast('You have been logged out.', 'info');
  };

  const openLoginModal = (defRole: UserRole = 'student') => {
    setDefaultLoginRole(defRole);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const quickLogin = async (targetRole: UserRole) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: targetRole, password: 'password123', role: targetRole })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        login(data.token, data.user);
        closeLoginModal();
      } else {
        addToast(data.error || 'Quick login failed', 'error');
      }
    } catch (err) {
      addToast('Network error logging in', 'error');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        theme,
        toggleTheme,
        login,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        defaultLoginRole,
        isSearchOpen,
        openSearch,
        closeSearch,
        toasts,
        addToast,
        removeToast,
        quickLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
