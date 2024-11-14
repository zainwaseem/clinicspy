import { create } from "zustand";

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

// Define Zustand state interface
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

// Create Zustand store
const useAuthStore = create<AuthState>((set) => ({
  user: null,

  // Function to login the user and store in localStorage
  login: (userData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    set({ user: userData });
  },

  // Function to load user from localStorage
  loadUser: () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const parsedUser = safeParseJSON(storedUser);
      if (parsedUser) {
        set({ user: parsedUser });
      }
    }
  },

  // Function to logout the user
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    set({ user: null });
  },
}));

export default useAuthStore;
