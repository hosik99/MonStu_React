import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import Main from './pages/Main';
import PwQuizPage from './pages/PwQuizPage';
import SignUpPage from './pages/SignUpPage';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/login/signup" element={<SignUpPage/>}></Route>
          <Route path="/admin" element={<AdminPage/>}></Route>
          <Route path="/admin/pwquiz" element={<PwQuizPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
