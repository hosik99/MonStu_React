import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { wordController } from "../../../hooks/controller/wordController";

const StyledWords = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
    border-bottom: 2px solid #ace1af;
    padding-bottom: 5px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display:flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    color: #555;
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e8f5e9;
    }
  }

  /* 모바일 화면에서의 스타일 */
  @media (max-width: 768px) {
    padding: 10px;
    
    h3 {
      font-size: 1.25rem;
    }
    
    li {
      font-size: 0.875rem;
    }
  }
`;

const CheckButton = styled.button`
    margin-left: auto;  /* 오른쪽 끝으로 밀어내기 */
    background-color: ${props => props.active ? '#f44336' : '#4caf50'};
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      // background-color: #d32f2f;
    }
`;

function Words({ words,selList,handel }) {

  if (!Array.isArray(words) || words.length === 0) return <StyledWords>No Data</StyledWords>;

  // reduce를 사용해서 contentTitle을 기준으로 word를 그룹화
  //acc -> 누적객체
  const groupedWords = words.reduce((acc, word) => {
      if (!acc[word.contentTitle]) {
          acc[word.contentTitle] = [];
      }
      acc[word.contentTitle].push(word);
      return acc;
  }, {});

  
  /*
    Optional Chaining (?.)을 사용하여 안전하게 undefined 여부를 확인하고, undefined일 경우 includes 메서드를 호출하지 않습니다
  */
  return (
      <StyledWords>
          {Object.keys(groupedWords).map((title, index) => (
              <div key={`title-${index}`}>
                  <h3>{title}</h3>
                  <ul>
                      {groupedWords[title].map(word => (
                          <li key={word.myWordId}>
                              {word.targetWord} - {word.translatedWord}
                              <CheckButton 
                                active={selList[word.contentId]?.includes(word.myWordId)}
                                onClick={() => handel(word.contentId,word.myWordId,word.targetWord)}
                              >
                                Check
                              </CheckButton>
                          </li>
                      ))}
                  </ul>
              </div>
          ))}
      </StyledWords>
  );
}

export default Words;
