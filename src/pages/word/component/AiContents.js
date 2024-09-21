import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { delAiContent, getAllAiContent } from "../communication/aiContentController";
import { useNavigate } from "react-router-dom";

// Container 스타일링
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
`;

// 개별 콘텐츠 스타일링
const ContentItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
    background-color: #ffffff;
    margin: 10px 0;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

// 콘텐츠의 텍스트 스타일링
const ContentLabel = styled.label`
    font-size: 18px;
    color: #333;
    cursor: pointer;
`;

const DelButton = styled.button`

`

function AiContents({ contentList}) {

    const navigate = useNavigate();

    const handleDelBtn = (id) => {
        delAiContent(id);
        navigate(0);
    }

    return (
        <Container>
            {Array.isArray(contentList) && contentList.length > 0 ? (
                contentList.map((dto, index) => (
                    <ContentItem key={index}>
                        <ContentLabel>
                            {dto.aiContent}
                        </ContentLabel>
                        <DelButton onClick={()=>{handleDelBtn(dto.aiContentId);}}>Delete</DelButton>
                    </ContentItem>
                ))
            ) : (
                <div>No Data</div>
            )}
        </Container>
    );
}

export default AiContents;
