import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Words from "./component/Words";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { delWords, getWords } from "./communication/wordControllerC";

const Container = styled.div`

`;


function MyWordsPage() {

    const navigate = useNavigate();

    const [words,setWords] = useState([]);
    const [selList,setSelList] = useState({});  //삭제할 목록 { contentID : [...wordsList] }

    
     const handelDelButton = (contentId,myWordId) => {
      setSelList((prevSelList) => {   //prevDelList->원래의 목록
          const currentList = prevSelList[contentId] || [];
    
          if (currentList.includes(myWordId)) {
            // wordId를 제거
            return {
              ...prevSelList,
              [contentId]: currentList.filter((id) => id !== myWordId),
            };
          } else {
            // wordId를 추가
            return {
              ...prevSelList,
              [contentId]: [...currentList, myWordId],
            };
          }
        });
      };

      //if( delList.length > 0 )
    useEffect(() => {
      getWords(setWords);
    },[]);     

    useEffect(() => {
        console.log("Words state updated:", words); // words 상태가 업데이트될 때 확인
      }, [words]);

    useEffect(() => {
        console.log("Current selList state:", selList);
    }, [selList]);

    return(
        <Container>
            <Header/>
            <Button onClick={()=>{ delWords(selList); navigate(0); }}>Delete</Button>
            <Words words={words} selList={selList} handel={handelDelButton}></Words>
        </Container>
    );
}

export default MyWordsPage;