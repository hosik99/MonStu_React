import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreContentModal from "./Modal/CreContentModal";
import AiContents from "./component/AiContents";
import MsgPopup from "../../components/popupBox/MsgPopup";
import { getAll } from "../../hooks/api/controller/aiContentController";
import Header from "../../components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  // 가로로 중앙 배치
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;  // 화면이 작을 때도 최소한 화면 전체를 사용
`;

const CreButton = styled.button`
  width: 100%;             
  max-width: 800px;         // 최대 너비를 800px로 제한 (화면이 너무 넓을 때)
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


function SelectPage(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentList,setContentList] = useState([]);
    const [msg,setMsg] = useState('');
    const [msgId,setMsgId] = useState(0);

    const openModal = () => { setIsModalOpen(true); };
    const closeModal = () => { setIsModalOpen(false); };

    const handleMsgId = () => {
        setMsgId((prevMsgId) => prevMsgId + 1);
    }

    const refreshAiContent = async () => {
        const result = await getAll();
        if(result.success){
            setContentList(result.data);
        }else{
            setMsg(result.message);
        }
    }

    useEffect(() => {
        refreshAiContent();
    },[]);

    return(
        <div>
            <Header/>
            <Container>
                <CreButton onClick={openModal}>Create New Stroy</CreButton>
                <CreContentModal closeModal={closeModal} isModalOpen={isModalOpen} setMsg={setMsg} refreshAiContent={refreshAiContent}/>

                <AiContents contentList={contentList} setMsg={setMsg} handleMsgId={handleMsgId} refreshAiContent={refreshAiContent}/>
                <MsgPopup msg={msg} id={msgId}/>
            </Container>
        </div>
    );
}

export default SelectPage;