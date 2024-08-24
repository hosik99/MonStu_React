import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../security/useAuth";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const HeaderStyle = styled.header`
    background: #ACE1AF;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */

    @media (max-width: 768px) {
        flex-direction: row;
        padding: 10px 15px; /* 위 | 오른쪽 | 아래 | 왼쪽 */
        justify-content: space-between; 
    }
`;

const Logo = styled.div`
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 768px) {
        display:flex;
        /* justify-content: flex-end; */
    }
  }

  ul li {
    margin-left: 20px;

    @media (max-width: 768px) {
      margin-left: 30px;
      margin-bottom: 10px;
    }
  }

  ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    font-weight: bold;

    &:hover {
        color: #F6FB7A; /* hover 시 색상 변경 */
    }
  }
`;
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function Header() {

  const isAuthenticated = useAuth();
  
  return (
      <HeaderStyle>
          <Logo>MONSTU</Logo>
          <Nav>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li>{!isAuthenticated ? (<Link to="/login">Login</Link>) : (<Link to="/logout">Logout</Link>)}</li>
              </ul>
          </Nav>
      </HeaderStyle>
  );
}

export default Header;
