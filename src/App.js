import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import PrivateRoute from './security/PrivateRoute';

import Main from './pages/Main';
import LoginPage from './pages/sign/LoginPage';
import LogoutPage from './pages/sign/LogoutPage';
import SignUpPage from './pages/sign/SignUpPage';
import ContentPage from './pages/post/ContentPage';
import SelectTitlePage from './pages/post/SelectTitlePage';
import AdminPage from './pages/admin/AdminPage';
import MyWordsPage from './pages/word/MyWordsPage';
import MkStoryPage from './pages/word/MkStoryPage';
import SelectPage from './pages/word/SelectPage';


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
          <Route path="/title" element={<PrivateRoute><SelectTitlePage /></PrivateRoute>} /> {/* 게시물 선택 페이지 - 로그인 필요ㄴ*/}
          <Route path="/words" element={<MyWordsPage />} /> {/* 즐겨찾기 단어 메인 페이지 */}
          {/* <Route path="/api/story" element={<MkStoryPage />} /> 즐겨찾기 단어 메인 페이지 */}
          <Route path="/aicon" element={<SelectPage />} /> {/* AI 게시물 선택 페이지 */}

          <Route path="/admin" element={<AdminPage />} /> {/* 관리자 페이지 */}
          <Route path='*' element={ <div>존재하지 않는 페이지</div> }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
