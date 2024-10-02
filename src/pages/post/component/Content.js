import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PopupBox from "./PopupBox";
import { trans } from "../../../hooks/api/controller/translationController";
import { sensing } from "../../../hooks/util/validation";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const StyledContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #739bb5; /* 파란색 */
  height: 100vh;
`;
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function Content({ content, setWordsHistory, wordsHistory, numId }) {
  const [selectText, setSelectText] = useState(""); // HIGHLIGHTED TEXT
  const [popupBoxPosition, setPopupBoxPosition] = useState(null); // 팝업 위치
  const [translatedText, setTranslatedText] = useState("");
  const [option, setOption] = useState({
    source: 'en',  // 원본 언어
    target: 'ko',  // 번역될 언어
  });

  const contentRef = useRef(null);  // Content 영역을 참조하는 ref

  // 번역 요청 및 히스토리 추가 함수
  const fetchTranslation = async (text) => {
    const result = await trans(text, option);
    if (result.success) {
      setTranslatedText(result.data.translatedText);
      if (text !== result.data.translatedText) {
        setWordsHistory((prevHistory) => [
          ...prevHistory,
          { myWordId: result.data.myWordId, targetWord: text, translatedWord: result.data.translatedText, contentId: numId },
        ]);
      }
    } else {
      alert(result.message);
    }
  };

  // 텍스트 선택 핸들러 설정
  const handleTextSelection = (event) => {
    if (contentRef.current && contentRef.current.contains(event.target)) {
      const selection = window.getSelection();  //selection 객체
      const selectedText = selection.toString().trim();

      if (selectedText) {
        setSelectText(selectedText);

        // 선택한 텍스트의 위치를 기반으로 팝업 위치 설정
        const range = selection.getRangeAt(0);  //사용자가 선택한 첫 번째 텍스트 범위를 나타내는 Range 객체를 가져옴
        const rect = range.getBoundingClientRect(); //선택된 텍스트 영역의 위치와 크기를 포함한 DOMRect 객체 반환 (top, left, right, bottom, width, height 등의 정보)
        setPopupBoxPosition({
          top: rect.top + window.scrollY - 30,  //window.scroll -> 마우스 스크롤 크기, recr -> 선택된 텍스트 영역의 좌표
          left: rect.left + window.scrollX + rect.width / 3,  // 텍스트의 가로위치
        });
      } else {
        setPopupBoxPosition(null);
      }
    }
  };

  // 이벤트 리스너 추가 및 제거
  useEffect(() => {
    // mouseup 이벤트 시 텍스트 선택 감지
    document.addEventListener("mouseup", handleTextSelection);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  const scanHistory = () =>{
    if(!wordsHistory) return false;
    for(let word of wordsHistory){
      console.log('word: '+ word.targetWord );
      if(word.targetWord === selectText){
        setTranslatedText(word.translatedWord);
        console.log('translatedWord-same');
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (sensing(selectText, option.source)) {
      if(!scanHistory()) fetchTranslation(selectText); 
    }
  }, [selectText]);

  return (
    <div>
      <StyledContent ref={contentRef}>{content.content}</StyledContent>
      <PopupBox text={translatedText} position={popupBoxPosition} />
    </div>
  );
}

export default Content;
