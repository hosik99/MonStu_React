import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreContentModal from "./Modal/CreContentModal";
import { Button } from "@mui/material";
import { getAllAiContent } from "./communication/aiContentController";
import AiContents from "./component/AiContents";

const Container = styled.div`

`



function SelectPage(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentList,setContentList] = useState([]);

    const openModal = () => { setIsModalOpen(true); };
    const closeModal = () => { setIsModalOpen(false); };

    useEffect(() => {
        getAllAiContent(setContentList);
    },[]);

    useEffect(() => {
        console.log('contentList: '+contentList);
    },[contentList]);

    return(
        <Container>
            <Button onClick={openModal}>Create New Stroy</Button>
            <CreContentModal closeModal={closeModal} isModalOpen={isModalOpen} />

            <AiContents contentList={contentList}/>
        </Container>
    );
}

export default SelectPage;