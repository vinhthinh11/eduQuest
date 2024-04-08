import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { Toaster } from 'react-hot-toast';
import PageNotFound from './pages/PageNotFound.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AdminLayout from './admin/AdminLayout.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import AdminPage from './admin/AdminPage.jsx';
import User from './admin/manage/User.jsx';
import ClassDetail from './admin/manage/ClassDetail.jsx';
import Question from './admin/manage/Question.jsx';
import UserDetail from './admin/manage/UserDetail.jsx';
import HeadDetail from './admin/manage/HeadDetail.jsx';
import TeacherDetail from './admin/manage/TeacherDetail.jsx';
import Contact from './pages/Contact.jsx';
import Chat from './pages/Chat.jsx';
import Statistic from './pages/Statistic.jsx';
import ProfileForm from './components/ProfileForm.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
//NOTE : Trong trang nay co 2 trang chua design la trang chat va contact

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="contact" element={<Contact />} />
        <Route path="chat" element={<Chat />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="admin" element={<UserDetail />} />
          <Route path="head" element={<HeadDetail />} />
          <Route path="teacher" element={<TeacherDetail />} />
          <Route path="student" element={<User />} />
          <Route path="class" element={<ClassDetail />} />
          <Route path="exam" element={<User />} />
          <Route path="statistic" element={<Statistic />} />
          <Route path="question" element={<Question />} />
          <Route path="profile" element={<ProfileForm />} />
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
