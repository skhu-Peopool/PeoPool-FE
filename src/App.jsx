import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/page";
import Community from "./pages/community/page";
import SignInPage from "./pages/signIn/page";
import SignUpPage from "./pages/signup/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
