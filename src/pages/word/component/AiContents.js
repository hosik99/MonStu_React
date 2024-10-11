import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { del } from "../../../hooks/api/controller/aiContentController";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    width: 100%;  // 전체 너비 사용
`;

const ContentItem = styled.div`
    display: flex;
    justify-content: space-between;  // 양쪽 끝에 요소 배치
    align-items: center;
    width: 100%;  // 가로 길이를 100%로 설정
    max-width: 800px;  // 콘텐츠 최대 너비를 800px로 확장
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

const ContentLabel = styled.label`
    font-size: 18px;
    color: #333;
    cursor: pointer;
    flex-grow: 1;  // 라벨이 가능한 한 많은 공간 차지
`;

const DelButton = styled.button`
  margin-left: 10px;
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


function AiContents({ contentList,setMsg,handleMsgId,refreshAiContent}) {

    //하나의 AiContent 삭제
    const handleDelBtn = async (id) => {
        const response = await del(id);
        if(response.success){
            refreshAiContent();
        }else{
            setMsg(response.message);
        }
        handleMsgId();
    };

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
