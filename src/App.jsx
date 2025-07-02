// import './App.css'
import Landing from './pages/page';
import Community from './pages/community/page';
import SignInPage from './pages/signIn/page';
import SignUpPage from './pages/signup/page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="community" element={<Community />} />
        <Route path='signIn' element={<SignInPage />} />
        <Route path='signUp' element={<SignUpPage />} />
      </Routes>
  );
}

export default App
