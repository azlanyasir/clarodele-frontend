import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authAPI } from "@/services/auth";

// This interface matches the UserResponse schema from your backend
interface User {
  email: string;
  full_name: string;
  user_id: string;
  user_type: string;
  subscription_status: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On app load, check if a token exists in localStorage
  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // authAPI's interceptor will automatically add the token to this request
          const user = await authAPI.getCurrentUser();
          setCurrentUser(user);
        } catch (error) {
          console.error("Session expired or token is invalid", error);
          authAPI.logout(); // Clear the bad token
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, []);

  // Signup: Creates user in your backend, then logs them in
  const signup = async (email: string, password: string, name: string) => {
    await authAPI.signup({
      email: email,
      password: password,
      full_name: name,
      user_type: "free",
    });
    // After signup, log them in immediately to get a token and set the user
    await login(email, password);
  };

  // Login: Gets a token from your backend, saves it, then fetches the user
  const login = async (email: string, password: string) => {
    await authAPI.login(email, password);
    // After authAPI.login saves the token, fetch the user's data
    const user = await authAPI.getCurrentUser();
    setCurrentUser(user);
  };

  // Logout: Clears the token and the user state
  const logout = () => {
    authAPI.logout();
    setCurrentUser(null);
  };

  // NOTE: loginWithGoogle is removed as your backend doesn't support it.
  // You can keep Firebase for Analytics, but not for auth.

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};