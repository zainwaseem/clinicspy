"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define UserProfile type
interface UserProfile {
  email: string;
  name: string;
  _id: string;
  token: string;
  isSubscribed: boolean;
  subscriptionStatus: string;
  subscriptionId: string;
  subscriptionEndDate: string;
  subscriptionStartDate: string;
}

// Define AuthContext state interface
interface AuthState {
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  loadUser: () => void;
  logout: () => void;
}

// Utility function to safely parse JSON
const safeParseJSON = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

// Create AuthContext
const AuthContext = createContext<AuthState | undefined>(undefined);

// Create AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Function to login the user and store in localStorage
  const login = (userData: UserProfile) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setUser(userData);
  };

  // Function to load user from localStorage
  const loadUser = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const parsedUser = safeParseJSON(storedUser);
      if (parsedUser) {
        setUser(parsedUser);
      }
    }
  };

  // Function to logout the user
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    setUser(null);
  };

  // Load user from localStorage when the component mounts
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
