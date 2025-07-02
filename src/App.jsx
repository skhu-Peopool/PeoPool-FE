// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/page";
import Community from "./pages/community/page";
import SignInPage from "./pages/signIn/page";
import SignUpPage from "./pages/signup/page";
import Layout from "./layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* 헤더 없는 페이지 */}
        <Route path="/" element={<Landing />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />

        {/* 헤더 포함되는 페이지 */}
        <Route element={<Layout />}>
          <Route path="/community" element={<Community />} />
          {/* 추가될 경우 여기에 추가 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
