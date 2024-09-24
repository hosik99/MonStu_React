import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PopupBox from "./PopupBox";
import {translationWord} from "../../../hooks/api/controller/translationController";
import TextSelectionHandler from "./TextSelectionHandler";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const StyledContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #739bb5; /* 파란색 */
  height: 100vh;
`;
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function Content({ content, setWordsHistory, numId }) {
  const [selectText, setSelectText] = useState(""); // HIGHLIGHTED TEXT
  const [popupBoxPosition, setPopupBoxPosition] = useState(null); // 팝업 위치
  const [translatedText, setTranslatedText] = useState("");
  const contentRef = useRef(null);  //ref를 사용하면 이벤트 리스너가 정확히 해당 요소 내에서만 작동하도록 보장 가능

  // ADD NEW TRANSLATED TEXT TO HISTORY
  const addToHistory = (myWordId, targetText, newText) => {
    console.log("myWordId: " + myWordId + " targetText: " + targetText + " newText: " + newText);
    setWordsHistory((prevHistory) => [
      ...prevHistory,
      { myWordId: myWordId, targetWord: targetText, translatedWord: newText, contentId: numId },
    ]);
  };

  // Run translation function when selectText changes
  const fetchTranslation = async (selectText) => {
    if (selectText && selectText !== "") {
        const result = await translationWord(selectText);
        for(let key in result.data){
          console.log(`${key} : ${result.data[key]}`);
        }
        setTranslatedText(result.data.translatedText);
        if (selectText !== result.translatedText) addToHistory(result.data.myWordId, selectText, result.data.translatedText); // 번역 되었을 경우
    }
  };

  useEffect(() => {
    fetchTranslation(selectText);
  }, [selectText]);

  useEffect(() => {
    const handleTextSelection = (event) => {
      if (contentRef.current && contentRef.current.contains(event.target)) {
        // 현재 클릭이 contentRef 내부에서 발생했는지 확인 (사용자가 텍스트를 선택한 영역이 StyledContent 내부인지 여부)
        //contentRef.current -> DOM요소 (StyledContent), event.target -> 태그 요소
        TextSelectionHandler.setUpTextSelectionHandler(setSelectText, setPopupBoxPosition);
      }
    };

    // contentRef가 유효할 때만 이벤트 리스너 추가
    if (contentRef.current) {
      contentRef.current.addEventListener("mouseup", handleTextSelection);
    }

    return () => {
      // contentRef가 유효할 때만 이벤트 리스너 제거
      if (contentRef.current) {
        contentRef.current.removeEventListener("mouseup", handleTextSelection);
      }
      TextSelectionHandler.cleanupTextSelectionHandler();
    };
  }, []);

  return (
    <div>
      <StyledContent ref={contentRef}>{content.content}</StyledContent>
      <PopupBox text={translatedText} position={popupBoxPosition} />
    </div>
  );
}

export default Content;
