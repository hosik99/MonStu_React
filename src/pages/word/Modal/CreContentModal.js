import React, { useEffect, useState } from "react";
import Words from "../component/Words";
import { useNavigate } from "react-router-dom";
import { cre } from "../../../hooks/api/controller/aiContentController";
import { getAll } from "../../../hooks/api/controller/wordController";
import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    pointer-events: all; /* 모달에만 이벤트 적용 */
`;

const StyledModal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    min-width: calc(100vw - 500px);
    min-height: calc(100vh - 100px);
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative; /* 부모에 대한 상대적 위치 */
    box-sizing: border-box;
`;

const StyledButton = styled.button`
    margin: -0.5px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const CreContentModal = ({ closeModal,isModalOpen,setMsg }) => {

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
        const result = await cre(selList);
        if(result.success){
            // const content = JSON.parse(result.data).result.message.content;
            setMsg(result.message);
            closeModal();
            //새로고침
        }else{
            alert(result.message)
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

    useEffect(() => {
        refreshWords();
    },[]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return (
        <ModalOverlay>
            <StyledModal isOpen={isModalOpen}>
                <Words words={words} selList={selList} handel={handelSelect}/>
                <div>
                    <StyledButton onClick={actCreateBtn}>Create</StyledButton>
                    <StyledButton onClick={closeModal}>취소</StyledButton>
                </div>
            </StyledModal>
        </ModalOverlay>
    );
}

export default CreContentModal;