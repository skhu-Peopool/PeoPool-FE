import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/page";
import Community from "./pages/community/page";
import SignInPage from "./pages/signIn/page";
import SignUpPage from "./pages/signup/page";
import styled from "styled-components";
import { useState } from "react";
import HeaderSlide from "./components/global/HeaderSlide";
import OthersPage from "./pages/others/page";
import CalendarPage from "./pages/calendar/page";
import ProfilePage from "./pages/profile/page";
import CommunityDetail from "./pages/community/CommunityDetail";
import PostsPage from "./pages/community/PostsPage";
import { useAuth } from "./providers/AuthProvider";
import EmailCodePage from "./pages/code/page";

// 헤더 포함 레이아웃 설정
function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AppWrapper>
      <HeaderSlide open={isSidebarOpen} setOpen={setIsSidebarOpen} />

      <Content style={{paddingTop: '4rem'}} $hasSidebar={isSidebarOpen}>{children}</Content>
    </AppWrapper>
  );
}

// 라우트 가드
function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/signIn" replace />;
}

function PublicRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  return !user ? children : <Navigate to="/community" replace />;
}

// MainLayout 설정 분리
function AppRoutes() {
  return (
    <Routes>
      {/* 비회원 전용 */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/signIn"
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signUp"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path="/code"
        element={
          // <PublicRoute>
          <EmailCodePage />
          // </PublicRoute>
        }
      />

      {/* 회원/비회원 공용 */}
      <Route
        path="/community"
        element={
          <MainLayout>
            <Community />
          </MainLayout>
        }
      />
      <Route
        path="/community/:id"
        element={
          <MainLayout>
            <CommunityDetail />
          </MainLayout>
        }
      />
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <MainLayout>
              <PostsPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/edit/:postId"
        element={
          <PrivateRoute>
            <MainLayout>
              <PostsPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/others"
        element={
          <PrivateRoute>
            <MainLayout>
              <OthersPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <PrivateRoute>
            <MainLayout>
              <CalendarPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* 잘못된 주소 → 커뮤니티 */}
      <Route path="*" element={<Navigate to="/community" replace />} />
    </Routes>
  );
}

// 최종 라우터
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  overflow-y: auto;
`;

const Content = styled.main`
  flex: 1;
`;
