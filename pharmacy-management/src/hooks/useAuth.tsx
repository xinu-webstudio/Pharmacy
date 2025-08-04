// src/hooks/useAuth.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Key for auth-related data in React Query cache
const AUTH_QUERY_KEY = "auth";

// Initialize auth state from localStorage on app load
const userDetails = {
  _id: "random21",
  name:"admin"
}
export const initializeAuth = () => {
   localStorage.setItem('token', "token")
   localStorage.setItem('user',JSON.stringify(userDetails))
  // JSON.parse(localStorage.setItem())

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return token && user ? { token, user: JSON.parse(user) } : null;
};

export const useAuth = () => {
  return useQuery({
    queryKey: [AUTH_QUERY_KEY],
    queryFn: () => initializeAuth(), // Fetch initial state from localStorage
    staleTime: Infinity, // Treat as static data
  });
};


export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Invalidate auth-related queries
    queryClient.removeQueries({ queryKey: [AUTH_QUERY_KEY] });
  };
};