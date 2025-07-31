import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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

// 헤더 포함 레이아웃 설정
function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const handleMouseMove = (e) => {
  //   if (!isSidebarOpen && e.clientX < 20) {
  //     setIsSidebarOpen(true);
  //   }
  // };

  return (
    <AppWrapper>
      <HeaderSlide open={isSidebarOpen} setOpen={setIsSidebarOpen} />

      <Content $hasSidebar={isSidebarOpen}>{children}</Content>
    </AppWrapper>
  );
}

// MainLayout 설정 분리
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route
        path="/community"
        element={
          <MainLayout>
            <Community />
          </MainLayout>
        }
      />
      <Route
        path="/posts"
        element={
          <MainLayout>
            <PostsPage />
          </MainLayout>
        }
      />
      <Route
        path="/others"
        element={
          <MainLayout>
            <OthersPage />
          </MainLayout>
        }
      />
      <Route
        path="/calendar"
        element={
          <MainLayout>
            <CalendarPage />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProfilePage />
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
