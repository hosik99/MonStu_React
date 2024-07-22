import React from "react";

import ContentPage from "./ContentPage";
import AdminPage from "./AdminPage";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`
const StyledMain = styled.main`
    display: flex;
    flex: 1 1 auto; //flex-grow 남는 공간을 분배, flex-shrink 공간을 넘어갈 경우, flex-basis 아이템의 기본 사이즈를 지정
    background: #fff;
`;

const StyledArticle = styled.article`
    background: #fff;
    padding: 20px;
    flex: 1;    //남은 공간을 채우기
    border: 1;
    border-style: outset;
`;

const StyledLink = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    margin: 10px;
    font-size: 18px;
    color: #fff;
    background-color: #5bc0de; // Light blue color
    border: 2px solid #46b8da;
    border-radius: 30px;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease; //천천히 0.3s 동안 변화 

    &:hover {
        background-color: #269abc; // Darker blue on hover
        border-color: #269abc;
    }

    &:active {
        /* background-color: #269abc; // Even darker blue when active */
    }
`;

function Main(){
    return(
        <Wrapper>
            <Header/>
            <StyledMain>
                {/* <Sidebar/> */}
                
                <StyledArticle>
                    <StyledLink to="/content">ContentPage</StyledLink>  {/*게시물*/}
                    <StyledLink to="/login/signup">SignUpPage</StyledLink>  {/*회원가입*/}
                </StyledArticle>
                {/* <hr/>
                <AdminPage/>
                <hr/>
                <Link to="/login/signup">SignUpPage</Link> */}
            </StyledMain>
            <Footer/>
        </Wrapper>
    );
}

export default Main;