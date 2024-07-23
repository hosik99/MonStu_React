import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import Main from './pages/Main';
import PwQuizPage from './pages/PwQuizPage';
import SignUpPage from './pages/signUp/SignUpPage';
import ContentPage from './pages/ContentPage';
import LoginPage from './pages/login/LoginPage';

/*
  Link 컴포넌트를 사용하면 페이지가 새로 고침되지 않고 클라이언트 측에서 URL이 변경
*/
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
          <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 */}
          {/* <Route path="/login/signup" element={<ProtectedRoute><SignUpPage /></ProtectedRoute>} /> */}
          <Route path="/login/signup" element={<SignUpPage />} /> {/*회원가입 페이지*/}
          <Route path="/content" element={<ContentPage />} /> {/* 공부 메인 페이지 */}
          <Route path="/admin" element={<AdminPage />} /> {/* 관리자 페이지 */}
          <Route path="/admin/pwquiz" element={<PwQuizPage />} /> {/* 비밀번호 퀴즈 관리 페이지 */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
