import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Words from "./component/Words";
import { del, getAll } from "../../hooks/api/controller/wordController";
import MsgPopup from "../../components/popupBox/MsgPopup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면 높이 */
`;

const WordsContainer = styled.div`
  flex-grow: 1; /* 화면의 남은 공간을 모두 차지 */
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
`;

const DelButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }
`;

function MyWordsPage() {

    const [words,setWords] = useState([]);
    const [selList,setSelList] = useState({});  //삭제할 목록 { contentID : [...wordsList] }
    const [msg,setMsg] = useState('');
    
    //contentId,myWordId
    const handelDelButton = (word) => {
    setSelList((prevSelList) => {   //prevDelList->원래의 목록
        const currentList = prevSelList[word.contentId] || [];
  
        if (currentList.includes(word)) {
          // wordId를 제거
          return {
            ...prevSelList,
            [word.contentId]: currentList.filter((val) => val !== word),
          };
        } else {
          // wordId를 추가
          return {
            ...prevSelList,
            [word.contentId]: [...currentList, word],
          };
        }
      });
    };

    const handleDelBtn = async (selList) => {
      const result = await del(selList);
      if(result.success){
        setMsg(result.message);
        refreshWords();
      }else{
        setMsg(result.message);
      }
    }

    const refreshWords = async () => {
      const result = await getAll();
      if(result.success){
        setWords(result.data);
      }else if(result.status===204){
        setWords(null);
      }else{
        setWords(null);
        alert(result.message);
      }
    }

    //if( delList.length > 0 )
    useEffect(() => {
      refreshWords();
    },[]);     

    return(
        <Container>
            <Header/>
            <DelButton onClick={() => handleDelBtn(selList)}>Delete</DelButton>
            <WordsContainer>
              <Words words={words} selList={selList} handel={handelDelButton}></Words>
            </WordsContainer>
            <MsgPopup msg={msg}/>
        </Container>
    );
}

export default MyWordsPage;