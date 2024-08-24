import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { contentController } from "../../contorller/contentController";
import { useNavigate, useParams } from "react-router-dom";
import PopupBox from "./PopupBox";
import { translationController } from "../../contorller/translationController";
import WordHistory from "./WordHistory";

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
  const [myWordDTOList, setMyWordDTOList] = useState([]);
  const [transHistory, setTransHistory] = useState([]);
  const [selectText , setSelectText] = useState('');
  const [translatedText,setTranslatedText] = useState('');
  const [popupBoxPosition, setPopupBoxPosition] = useState(null); // 팝업 위치 상태

  //텍스트 하이라이팅 했을때 실행 
  const handleTextSelection = () => {
    const selection = window.getSelection(); // 여기에서 selection을 정의
    const selectedText = selection.toString().trim();

    if (selectedText) {
      setSelectText(selectedText);

      // 텍스트 위치 계산
      const range = selection.getRangeAt(0);  //사용자가 선택한 첫 번째 텍스트 범위를 나타내는 Range 객체를 가져옴
      const rect = range.getBoundingClientRect(); //선택된 텍스트 영역의 위치와 크기를 포함한 DOMRect 객체 반환 (top, left, right, bottom, width, height 등의 정보)
      setPopupBoxPosition({
        top: rect.top + window.scrollY - 30, // 팝업 박스가 텍스트 위에 위치하도록 조정
        left: rect.left + window.scrollX + rect.width / 3, // 텍스트의 가로위치
      });
    } else {
      setPopupBoxPosition(null); // 선택 취소 시 팝업 박스 숨김
    }
  };

  // 새로운 요소를 transHistory에 추가하는 함수
  const addToHistory = (myWordId,targetText,newText) => {
    setTransHistory(prevHistory => [...prevHistory, {'myWordId':myWordId,'targetWord':targetText,'translatedWord':newText,'contentId':id}]);
    console.log('myWordId: '+myWordId+' targetText: '+targetText + ' newText: ' +newText)
    console.log('transHistory: '+transHistory);
  };

  //PAPAGO API로부터 단어 번역요청
  const translationWord = async (selectText) => {
    console.log(`translationWord -> ${selectText}`);
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
        console.log('tra_selectText: ' + selectText);
        addToHistory(result.myWordId,selectText,result.translatedText);
      }
    } catch (error) {
        console.log(`error : ${error.message}`);
    }
  };

  //ContentDTO 객체 서버에게 요청
  const getContents = async () => {

    try {
      const numericId = Number(id);
      const response = await contentController(`/${numericId}`, 'get', null);
      if (response && response.data) {
        setContent(response.data.contentDTO);
        setMyWordDTOList(response.data.myWordDTOList ? response.data.myWordDTOList : "데이터가 없습니다");
      } else if (response.status === 204) {
        alert('게시물이 없습니다.');
        navigate(-1); // 이전 페이지로 이동
      } 
    } catch (error) {
        alert("데이터를 가져올 수 없습니다.");
    }
  };

  useEffect(() => {
    if (id) getContents(); // 페이지 접속 시 id를 넘겨 받았으면 서버로부터 데이터를 받아옴

    //텍스트 하이라이팅 메소드
    document.addEventListener('mouseup', handleTextSelection);
    return () => {  //// 컴포넌트가 언마운트될 때 실행
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, [id]); // cancelTokenSource를 의존성 배열에 추가

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
          <WordHistory list={transHistory}/>
          <StyledWord>
            {Array.isArray(myWordDTOList) ? (
              myWordDTOList.map((data) => (
                <div key={data.myWordId}>{data.targetWord}  -  {data.translatedWord}</div>
              ))
            ) : (
              <div>{myWordDTOList}</div>
            )}
          </StyledWord>
        </Words>
      </MainContent>
    </Container>
  );
}

export default ContentPage;
