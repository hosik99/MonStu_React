import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Words from "./component/Words";
import { Button } from "@mui/material";
import { del, getAll } from "../../hooks/api/controller/wordController";
import MsgPopup from "../../components/popupBox/MsgPopup";

const Container = styled.div`

`;


function MyWordsPage() {

    const [words,setWords] = useState([]);
    const [selList,setSelList] = useState({});  //삭제할 목록 { contentID : [...wordsList] }
    const [msg,setMsg] = useState('');
    
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
            <Button onClick={() => handleDelBtn(selList)}>Delete</Button>
            <Words words={words} selList={selList} handel={handelDelButton}></Words>
            <MsgPopup msg={msg}/>
        </Container>
    );
}

export default MyWordsPage;