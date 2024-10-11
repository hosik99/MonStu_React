import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from './security/PrivateRoute';

import Main from './pages/Main';
import LoginPage from './pages/sign/LoginPage';
import LogoutPage from './pages/sign/LogoutPage';
import SignUpPage from './pages/sign/SignUpPage';
import ContentPage from './pages/post/ContentPage';
import SelectTitlePage from './pages/post/SelectTitlePage';
import AdminPage from './pages/admin/AdminPage';
import MyWordsPage from './pages/word/MyWordsPage';
import SelectPage from './pages/word/SelectPage';
import { useState } from 'react';


/*
  Link 컴포넌트를 사용하면 페이지가 새로 고침되지 않고 클라이언트 측에서 URL이 변경
*/
function App() {

  const [publicRoutes, setPublicRoutes] = useState([
    { path: "/", element: <Main /> }, /* 메인 페이지 */
    { path: "/login", element: <LoginPage /> },/* 로그인 페이지 */
    { path: "/login/signup", element: <SignUpPage /> }, /* 회원가입 페이지 */

    { path: "/*", element: <div>존재하지 않는 페이지</div> },/* 존재하지 않는 페이지 */
  ]);

  const [privateRoutes, setPrivateRoutes] = useState([
    { path: "/logout", element: <LogoutPage /> },
    { path: "/admin", element: <AdminPage /> },
    { path: "/words", element: <MyWordsPage /> },         /* 즐겨찾기 단어 메인 페이지 */
    { path: "/aicon", element: <SelectPage /> },          /* AI 게시물 선택 페이지 */
    { path: "/title", element: <SelectTitlePage /> },     /* 게시물 선택 페이지 */
    { path: "/content/:id", element: <ContentPage /> },   /* 공부 메인 페이지 */
  ]);

  return (
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={ route.element } />
          ))}

          {privateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={ <PrivateRoute> {route.element} </PrivateRoute> } />
          ))}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
