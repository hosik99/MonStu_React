import React, { useEffect, useState } from "react";
import Words from "../component/Words";
import { useNavigate } from "react-router-dom";
import { creAicon } from "../../../hooks/api/controller/aiContentController";
import { getWords } from "../../../hooks/api/controller/wordController";

const CreContentModal = ({ closeModal,isModalOpen,setMsg }) => {

    const navigate = useNavigate();

    const [words,setWords] = useState([]);
    const [selList,setSelList] = useState([]);  //선택된 단어 목록
    
    const handelSelect = (contentId, wordId, targetWord) => {
        setSelList((prevSelList) => {   //prevDelList->원래의 목록
            const currentList = prevSelList[contentId] || [];
        
            if (currentList.includes(wordId)) {
                // wordId를 제거
                return {
                ...prevSelList,
                [contentId]: currentList.filter((id) => id !== wordId),
                };
            } else {
                // wordId를 추가
                return {
                ...prevSelList,
                [contentId]: [...currentList, wordId],
                };
            }
        });
    };

    //CREATE NEW AI CONTENT BY WORDLIST
    const actCreateBtn = async () => {
        const result = await creAicon(selList);
        if(result.success){
            // const content = JSON.parse(result.data).result.message.content;
            setMsg(result.message);
            closeModal();
            //새로고침
        }else{
            alert(result.message)
        }
    }

    useEffect(() => {
        getWords(setWords);
    },[]);

    useEffect(() => {
        console.log('selList: '+selList);
    },[selList]);

    if (!isModalOpen) return null;

    return (
        <div>
            <Words words={words} selList={selList} handel={handelSelect}/>
            <button onClick={actCreateBtn}>Create</button>
            <button onClick={closeModal}>취소</button>
        </div>
    );
}

export default CreContentModal;