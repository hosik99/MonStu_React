import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AdminPage from './pages/admin/AdminPage';
import Main from './pages/Main';
import PwQuizPage from './pages/pwQuiz/PwQuizPage';
import SignUpPage from './pages/signUp/SignUpPage';
import ContentPage from './pages/post/ContentPage';
import LoginPage from './pages/login/LoginPage';
import LogoutPage from './pages/login/LogoutPage';
import SelectTitlePage from './pages/post/SelectTitlePage';
import PrivateRoute from './security/PrivateRoute'

/*
  Link 컴포넌트를 사용하면 페이지가 새로 고침되지 않고 클라이언트 측에서 URL이 변경
*/
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} /> {/* 메인 페이지 */}

          <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 */}
          <Route path="/logout" element={<LogoutPage />} /> {/* 로그아웃 페이지 */}
          <Route path="/login/signup" element={<SignUpPage />} /> {/*회원가입 페이지*/}

          <Route path="/content/:id" element={<ContentPage />} /> {/* 공부 메인 페이지 */}
          <Route path="/select/title" element={<PrivateRoute><SelectTitlePage /></PrivateRoute>} /> {/* 게시물 선택 페이지 - 로그인 필요ㄴ*/}

          <Route path="/admin" element={<AdminPage />} /> {/* 관리자 페이지 */}
          <Route path="/admin/pwquiz" element={<PwQuizPage />} /> {/* 비밀번호 퀴즈 관리 페이지 */}
          <Route path='*' element={ <div>존재하지 않는 페이지</div> }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
