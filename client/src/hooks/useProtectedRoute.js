import { useAuth } from './useAuth';

export const useProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  return { isAuthenticated, loading };
};