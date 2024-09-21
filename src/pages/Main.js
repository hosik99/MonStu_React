import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
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
    border: 1;
    border-style: outset;
    display: flex;
    align-items: center;  // 수직 중앙 정렬
    justify-content: center;  // 수평 중앙 정렬
    flex: 1;    // 남은 공간을 채우기
`;

const StyledLink = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    margin: 10px;
    font-size: 18px;
    color: #fff;
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
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function Main(){
    return(
        <Wrapper>
            <Header/>
            <StyledMain>
                <StyledArticle>
                    <StyledLink to="/title" style={{ backgroundColor: '#125B9A', border: '2px solid #FFBE98'}}>MyContents</StyledLink>  {/*게시물*/}
                    <StyledLink to="/words" style={{ backgroundColor: '#F05A7E', border: '2px solid #FFBE98'}}>MyWords</StyledLink>  {/*게시물*/}
                    <StyledLink to="/aicon" style={{ backgroundColor: '#F05A7E', border: '2px solid #FFBE98'}}>Study_MyWord</StyledLink>  {/*게시물*/}
                </StyledArticle>
            </StyledMain>
            <Footer/>
        </Wrapper>
    );
}

export default Main;