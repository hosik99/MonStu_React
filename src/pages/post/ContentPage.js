import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import WordNote from "./WordNote";
import { contentController } from "../../contorller/contentController";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// 전체 레이아웃을 감싸는 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

// 각 컬럼 스타일
const MainContent = styled.div`
  color : white;
  display: flex;
  flex: 1;
`;

const Words = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  flex: 1;
`;

const StyledWord = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #8561c5; /* 보라색 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledContent = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #739bb5; /* 파란색 */
`;

function ContentPage() {

  const navigate = useNavigate();

  const { id } = useParams();
  const [content, setContent] = useState([]);
  const [myWordDTOSList, setMyWordDTOSList] = useState([]);
  const [selectText , setSelectText] = useState('');

  //텍스트 하이라이팅 했을때 실행 
  const handleTextSelection = () => {
    const selectedText = window.getSelection().toString().trim;

    if (selectedText) {
      console.log(`Selected text: ${selectedText}`);
      setSelectText(selectedText);
    }
  };

  //PAPAGO API로부터 단어 번역요청
  const getTranslationWord = async () => {

    bodyData = {
      source:'en', //번역 텍스트 언어 코드
      target: 'ko', //번역 될 언어 코드
      text:selectText
    }

    try {
      const response = await contentController(`https://openapi.naver.com/v1/papago/n2mt`, 'post', bodyData);
      if (response && response.data) {
        setContent(response.data.contentDTO);
        setMyWordDTOSList(response.data.myWordDTOSList ? response.data.myWordDTOSList : "데이터가 없습니다");
      } else if (response.status === 204) {
        alert('게시물이 없습니다.');
      } 
    } catch (error) {
        alert("데이터를 가져올 수 없습니다.");
        navigate(-1); // 이전 페이지로 이동
    }
  };

  //ContentDTO 객체 서버에게 요청
  const getContents = async () => {

    try {
      const numericId = Number(id);
      const response = await contentController(`/${numericId}`, 'get', null);
      if (response && response.data) {
        setContent(response.data.contentDTO);
        setMyWordDTOSList(response.data.myWordDTOSList ? response.data.myWordDTOSList : "데이터가 없습니다");
      } else if (response.status === 204) {
        alert('게시물이 없습니다.');
      } 
    } catch (error) {
        alert("데이터를 가져올 수 없습니다.");
        navigate(-1); // 이전 페이지로 이동
    }
  };

  useEffect(() => {
    if (id) getContents(); // 페이지 접속 시 id를 넘겨 받았으면 서버로부터 데이터를 받아옴

    //텍스트 하이라이팅 메소드
    document.addEventListener('mouseup', handleTextSelection);
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, [id]); // cancelTokenSource를 의존성 배열에 추가

  return (
    <Container>
      <Header />
      <MainContent>
        <StyledContent>{content.content}</StyledContent>

        <Words>
          <WordNote />
          <StyledWord>
            {Array.isArray(myWordDTOSList) ? (
              myWordDTOSList.map((word) => (
                <div key={word.myWordId}>{word.word}</div>
              ))
            ) : (
              <div>{myWordDTOSList}</div>
            )}
          </StyledWord>
        </Words>
      </MainContent>
    </Container>
  );
}

export default ContentPage;
