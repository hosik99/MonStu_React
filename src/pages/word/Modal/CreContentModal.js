import React, { useEffect, useState } from "react";
import { getWords } from "../communication/wordControllerC";
import Words from "../component/Words";
import { getContentApi } from "../communication/translationControllerC";
import { useNavigate } from "react-router-dom";

const CreContentModal = ({ closeModal,isModalOpen }) => {

    const navigate = useNavigate();

    const [words,setWords] = useState([]);
    const [selList,setSelList] = useState([]);
    
    const handelSelect = (contentId, wordId, targetWord) => {
        console.log('handelSelect  Worked');
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

    const actCreateBtn = () => {
        let isSucces = getContentApi(selList);
        isSucces ? closeModal() : alert('error');
        navigate(0);
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