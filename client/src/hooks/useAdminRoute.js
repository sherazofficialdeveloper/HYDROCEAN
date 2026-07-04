import { useAuth } from './useAuth';

export const useAdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  return { isAuthenticated, isAdmin, loading };
};