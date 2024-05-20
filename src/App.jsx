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
import ClassDetail from './admin/manage/ClassDetail.jsx';
import Question from './admin/manage/Question.jsx';
import UserDetail from './admin/manage/UserDetail.jsx';
import HeadDetail from './admin/manage/HeadDetail.jsx';
import SubjectDetail from './admin/manage/SubjectDetail.jsx';
// import TeacherDetail from './admin/manage/TeacherDetail.jsx';
import Contact from './pages/Contact.jsx';
import SendNotification from './components/admin/SendNotification.jsx';
import Statistic from './pages/Statistic.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import SubjectHeadLayout from './components/head/SubjectHeadLayout.jsx';
import TeacherLayout from './components/teacher/TeacherLayout.jsx';
import StudentLayout from './components/student/StudentLayout.jsx';
import StudentDoTest from './components/test/StudentDoTest.jsx';
import NofiticationTest from './components/admin/Nofitication.jsx';
import Nofitication from './components/student/NotificationList.jsx';
import NofiticationAdmin from './components/admin/NofiticationAdmin.jsx';
import StudentDoPractice from './components/test/StudentDoPractice.jsx';
// import ScoreComponent from './components/score/ScoreComponent.jsx';
import PracticeResult from './components/test/PracticeResult.jsx';
import PracticeResultDetail from './components/test/PracticeResultDetail.jsx';
import StudentOfClass from './components/student/StudentOfClass.jsx';
import Chat from './pages/Chat.jsx';
import SendNofiticationTeacher from './components/teacher/SendNotificationTeacher.jsx';
import TeacherPage from './components/teacher/TeacherPage.jsx';
import StudentPage from './components/student/StudentPage.jsx';
import HeadPage from './components/head/HeadPage.jsx';
import DetailStudentClass from './components/teacher/DetailStudentClass.jsx';
import ScoreList from './components/teacher/ScoreList.jsx';
import DetailScore from './components/teacher/DetailScore.jsx';

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
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<ProfileForm />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute permissions={1}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="admin" element={<UserDetail />} />
          <Route path="head" element={<HeadDetail />} />
          <Route path="teacher" element={<UserDetail />} />
          <Route path="student" element={<UserDetail />} />
          <Route path="class" element={<ClassDetail />} />
          <Route path="subject-head" element={<UserDetail />} />
          <Route path="subject" element={<SubjectDetail />} />
          <Route path="test" element={<UserDetail />} />
          <Route path="statistic" element={<Statistic />} />
          <Route path="question" element={<Question />} />
          <Route path="notification" element={<NofiticationAdmin />} />
          <Route path="senNofitication" element={<SendNotification />} />
        </Route>

        <Route
          path="/subject-head"
          element={
            <ProtectedRoute permissions={4}>
              <SubjectHeadLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HeadPage />} />

          <Route path="test" element={<UserDetail />} />
        </Route>
        <Route
          path="/teacher"
          element={
            <ProtectedRoute permissions={2}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherPage />} />
          <Route path="test" element={<UserDetail />} />
          <Route path="student" element={<UserDetail />} />
          <Route path="question" element={<UserDetail />} />
          <Route path="score" element={<ScoreList />} />
          <Route path="detail-score/:test_code" element={<DetailScore />} />
          <Route path="class" element={<UserDetail />} />
          <Route path="student/:class_id" element={<StudentOfClass />} />
          <Route path="sendNofitication" element={<SendNofiticationTeacher />} />
        </Route>
        <Route
          path="/student"
          element={
            <ProtectedRoute permissions={3}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentPage />} />

          <Route path="test" element={<UserDetail />} />
          <Route path="test/:test_code" element={<StudentDoTest />} />
          <Route path="practice" element={<UserDetail />} />
          <Route
            path="practice/:practice_code"
            element={<StudentDoPractice />}
          />
          <Route path="practice/result" element={<PracticeResult />} />
          <Route
            path="practice/result/:practice_code"
            element={<PracticeResultDetail />}
          />
          <Route path="score" element={<UserDetail />} />
          <Route path="notification" element={<Nofitication />} />
          {/* <Route path="/notification/:id" element={<NotificationDetailPage />} /> */}
          <Route path="chat" element={<Chat />} />
        </Route>

        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="nofiticationTest" element={<NofiticationTest />} />
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
