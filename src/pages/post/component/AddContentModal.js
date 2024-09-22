import React, { useState } from "react";
import styled from "styled-components";
import {saveData} from "../../../hooks/api/controller/contentController";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const StyledModal = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    min-width: calc(100vw - 500px); /* 화면 너비에서 20px씩 빼기 */
    min-height: calc(100vh - 100px); /* 화면 높이에서 20px씩 빼기 */
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box; /* padding과 border를 요소의 총 크기에 포함시킴 */
`;

const ModalTitle = styled.h2`
    margin-bottom: 20px;
    margin-left: 10px;
`;

const StyledText = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const StyledTextarea = styled.textarea`
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    resize: none; // Prevent resizing
    /* box-sizing: border-box; padding과 border를 요소의 총 크기에 포함시킴 */
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
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function AddContentModal( {closeModal,isModalOpen,getContents,setMsg} ){

    const [title,setTitle] = useState();
    const [content,setContent] = useState();
    
    const handleTitle = (e) => {setTitle(e.target.value);}
    const handleContent = (e) => {setContent(e.target.value);}

    //after saving data
    const handleSaveBtn = async (e) => {
        const response = await saveData(title,content);
        if(response.success){
            closeModal();
            getContents();  //새로고침
        }
        if(response.message) setMsg(response.message);
    }

    if (!isModalOpen) return null;

    return(
        <StyledModal isOpen={isModalOpen}>
            <ModalTitle>Add Content</ModalTitle>
            <StyledText type="text" onChange={handleTitle} placeholder="Input Title" required></StyledText>
            <StyledTextarea rows="15" cols="60" onChange={handleContent} placeholder="Input Content" required></StyledTextarea>
            <div>
                <StyledButton onClick={handleSaveBtn}>Save</StyledButton>
                <StyledButton onClick={closeModal}>Close</StyledButton>
            </div>
        </StyledModal>
    );
}

export default AddContentModal;