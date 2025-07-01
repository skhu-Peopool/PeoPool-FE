// import './App.css'
import Landing from './pages/page';
import Community from './pages/community/page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="community" element={<Community />} />
      </Routes>
  );
}

export default App
