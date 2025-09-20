import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router';
import useAuthStore from '../../lib/Store/authStore';
import api from '../../lib/api/ApiClient';
import { Loader } from 'lucide-react';

export const AdminProtectedRoute = ({children}) => {
    const location = useLocation();
  const { user, setAuth, clearAuth, token } = useAuthStore();
  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response data:", response.data);
      return response.data;
    },
    retry: 1,
  });
  // error case
  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, error, clearAuth]);

  // success case
  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data, token);
    }
  }, [isSuccess, data, setAuth, token]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader size={30} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("User", user);

   if(!user){
      return <Navigate to='/login' state={{from: location}} replace />
  }

  if(user.role !== 'admin') {
    return <Navigate to='/dashboard' state={{from: location}} replace />
  }
  return children
}
