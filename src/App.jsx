import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import { Toaster } from 'react-hot-toast';
import PageNotFound from './pages/PageNotFound.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import AdminPage from './admin/AdminPage.jsx';
import AdminsPanel from './admin/manage/UserDetail.jsx';
import User from './admin/manage/User.jsx';
import Question from './admin/manage/Question.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/admin" />} />
        {/*Chua co trang home page nen de tam trang admin*/}
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="admin" element={<User />} />
          <Route path="head" element={<User />} />
          <Route path="teacher" element={<User />} />
          <Route path="student" element={<User />} />
          <Route path="class" element={<User />} />
          <Route path="exam" element={<User />} />
          <Route path="statitic" element={<User />} />
          <Route path="question" element={<Question />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor: 'white',
          color: 'black',
        },
      }}
    />
  </QueryClientProvider>
);

export default App;
