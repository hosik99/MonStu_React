import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import Main from './pages/Main';
import PwQuizPage from './pages/PwQuizPage';
import SignUpPage from './pages/SignUpPage';
import ContentPage from './pages/ContentPage';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
          <Route path="/login/signup" element={<SignUpPage />} /> {/* 회원가입 페이지 */}
          <Route path="/content" element={<ContentPage />} /> {/* 공부 메인 페이지 */}
          <Route path="/admin" element={<AdminPage />} /> {/* 관리자 페이지 */}
          <Route path="/admin/pwquiz" element={<PwQuizPage />} /> {/* 비밀번호 퀴즈 관리 페이지 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
