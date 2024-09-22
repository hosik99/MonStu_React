import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header";
import WordHistory from "./component/WordHistory";
import Content from "./component/Content";
import { contentController } from "../../hooks/api/controller/contentController";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  color : white;
  display: flex;
  flex: 1;
`;

const StyledWords = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; /* Relative positioning for child elements */
  flex: ${props => (props.historyOption ? "1" : "0")};
  transition: flex 0.3s ease;
`;

const SwitchButton = styled.button`
  position: absolute; /* Absolute positioning for the button */
  top: 10px; /* Adjust distance from the top */
  right: 10px; /* Adjust distance from the right */
  background-color: ${props => props.active ? '#4caf50' : '#f44336'};
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1; /* Make sure button is above other content */
`;
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function ContentPage() {

  const navigate = useNavigate();

  const { id } = useParams(); //content id
  const numId = Number(id);
  const [content, setContent] = useState([]); 
  const [historyOption,setHistoryOption] = useState(true);  //true shows 'wordsHistory' : false shows 'sentencesHistory'
  const [wordsHistory, setWordsHistory] = useState([]); //HIGHLIGHTED WORDS HISTORY
  
 

  //REQUEST CONTENT DATA TO SPRING 
  const getContents = async () => {

    try {
      const response = await contentController(`/${numId}`, 'get', null);
      if (response && response.data) {
        setContent(response.data.contentDTO);
        console.log(response.data.myWordDTOList);
        setWordsHistory(response.data.myWordDTOList ? response.data.myWordDTOList : "데이터가 없습니다");
      } else if (response.status === 204) {
        alert('게시물이 없습니다.');
        navigate(-1); // 이전 페이지로 이동
      } 
    } catch (error) {
        alert("데이터를 가져올 수 없습니다.");
    }
  };

  //컴포넌트 실행 시 서버로 부터 content data를 받아옴
  //텍스트 하이라이팅 할 시 실행 할 함수 추가 (popupBox)
  useEffect(() => {
    if (id) getContents(); // 페이지 접속 시 id를 넘겨 받았으면 서버로부터 데이터를 받아옴
  }, [id]);

  return (
    <Container>
      <Header />
      <MainContent>
        <Content content={content} setWordsHistory={setWordsHistory} numId={numId}/>
        

        <StyledWords historyOption={historyOption}>
          <SwitchButton
            active={historyOption}
            onClick={() => setHistoryOption(prev => !prev)}
          >
            Words
          </SwitchButton>
          {historyOption ? <WordHistory list={wordsHistory}/> : null}
        </StyledWords>

      </MainContent>
    </Container>
  );
}

export default ContentPage;
