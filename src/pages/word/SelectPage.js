import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreContentModal from "./Modal/CreContentModal";
import { Button } from "@mui/material";
import AiContents from "./component/AiContents";
import MsgPopup from "../../components/popupBox/MsgPopup";
import { getAllAiContent } from "../../hooks/api/controller/aiContentController";

const Container = styled.div`

`

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
        const result = await getAllAiContent();
        if(result.success){
            setContentList(result.data);
        }else{
            setMsg(result.message);
        }
    }

    useEffect(() => {
        refreshAiContent();
    },[]);

    useEffect(() => {
        console.log('contentList: '+contentList);
    },[contentList]);

    return(
        <Container>
            <Button onClick={openModal}>Create New Stroy</Button>
            <CreContentModal closeModal={closeModal} isModalOpen={isModalOpen} setMsg={setMsg}/>

            <AiContents contentList={contentList} setMsg={setMsg} handleMsgId={handleMsgId} refreshAiContent={refreshAiContent}/>
            <MsgPopup msg={msg} id={msgId}/>
        </Container>
    );
}

export default SelectPage;