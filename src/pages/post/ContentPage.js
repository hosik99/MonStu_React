import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header";
import PopupBox from "./component/PopupBox";
import WordHistory from "./component/WordHistory";
import {translationController} from "../../hooks/controller/translationController";
import {contentController} from "../../hooks/controller/contentController";
import {validTranText,containSpace} from "../../hooks/method/translationVaild";
import TextSelectionHandler from "./component/TextSelectionHandler";
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

const Words = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative; /* Relative positioning for child elements */
`;

const StyledContent = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #739bb5; /* 파란색 */
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
  const [selectText , setSelectText] = useState('');  //HIGHLIGHTED TEXT
  const [translatedText,setTranslatedText] = useState('');  
  const [popupBoxPosition, setPopupBoxPosition] = useState(null); // 팝업 위치


  //ADD  NEW TRANSLATED TEXT TO HISTORY
  const addToHistory = (myWordId,targetText,newText) => {
    console.log('myWordId: '+myWordId+' targetText: '+targetText + ' newText: ' +newText);
    setWordsHistory(prevHistory => [...prevHistory, {'myWordId':myWordId,'targetWord':targetText,'translatedWord':newText,'contentId':numId}]);
  };

  //REQUEST TO PAPAGO API
  const translationWord = async (selectText) => {
    if( !validTranText(selectText) ) return null; //Text가 영어인지 확안
    
    try {
      const response = await translationController(`/translation`, 'post', {
        source:'en', //원본 언어 (auto 사용시 자동으로 소스 감지)
        target: 'ko', //번역 될 언어 코드
        text:selectText //1회 최대 5,000자 까지
      });
      if (response && response.data) {
        console.log(response.data);
        const result = response.data.message.result;
        setTranslatedText(result.translatedText);
        if( selectText!==result.translatedText) addToHistory(result.myWordId,selectText,result.translatedText); //번역 되었을 경우
      }
    } catch (error) {
        console.log(`error : ${error.message}`);
    }
  };

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
    TextSelectionHandler.setUpTextSelectionHandler(setSelectText, setPopupBoxPosition); //document 'mouseup' 이벤트에 실행 함수 추가
    return () => TextSelectionHandler.cleanupTextSelectionHandler();  ////document 'mouseup' 이벤트에 추가했던 함수 삭제
  }, [id]);

  //Run translation function when selectText changes
  useEffect(() => {
    if (selectText && !selectText=='') { translationWord(selectText); }
  },[selectText])

  return (
    <Container>
      <Header />
      <MainContent>
        <StyledContent>{content.content}</StyledContent>
        <PopupBox text={translatedText} position={popupBoxPosition} />

        <Words>
          <SwitchButton
            active={historyOption}
            onClick={() => setHistoryOption(prev => !prev)}
          >
            Words
          </SwitchButton>
          {historyOption ? <WordHistory list={wordsHistory}/> : null}
        </Words>

      </MainContent>
    </Container>
  );
}

export default ContentPage;
