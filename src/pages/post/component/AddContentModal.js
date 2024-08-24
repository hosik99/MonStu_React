import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import LoadingPage from "../../../components/LoadingPage";
import {contentController} from "../../../hooks/controller/contentController";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const StyledModal = styled(Modal)`
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
function AddContentModal(props){

    const {closeModal,isModalOpen} = props;
    const [title,setTitle] = useState();
    const [content,setContent] = useState();
    
    const [loading,setLoading] = useState(false);

    const handleTitle = (e) => {setTitle(e.target.value);}
    const handleContent = (e) => {setContent(e.target.value);}

    const saveData =async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        try {
            setLoading(true);
            const response = await contentController('/add','post',{
                'title' : title,
                'content' : content,
            });
            alert(response.data);
            closeModal();
        } catch (error) {
            if(error && error.response.data){alert(error.response.data);}
        }
        setLoading(false);
    };  

    if(loading){return <LoadingPage/>}

    return(
        <StyledModal isOpen={isModalOpen} contentLabel="Content Input Window">    {/* onRequestClose={closeModal} -> 창 꺼질떄 작동하는 메소드 */}
            <form onSubmit={saveData}>
                <ModalTitle>Add Content</ModalTitle>
                <StyledText type="text" name="title" onChange={handleTitle} placeholder="Input Title Here" ></StyledText>
                <StyledTextarea name="content" rows="15" cols="60" onChange={handleContent} placeholder="Content Here"></StyledTextarea>  {/*textarea가 화면크기를 변경해도 화면을 넘어가지 않게 CSS설정*/}
                <div>
                    <StyledButton type="submit">Save</StyledButton>
                    <StyledButton type="button" onClick={closeModal}>Close</StyledButton>
                </div>
            </form>
        </StyledModal>
    );
}

export default AddContentModal;