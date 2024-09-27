import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
`

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

const DelBtn = styled.button`
`

function MkWords({ words }) {

  if (!Array.isArray(words) || words.length === 0) return <StyledWords>No Data</StyledWords>;

  const groupedWords = words.reduce((acc, word) => {
      if (!acc[word.contentTitle]) {
          acc[word.contentTitle] = [];
      }
      acc[word.contentTitle].push(word);
      return acc;
  }, {});

  const delBtn = (contentTitle,wordId) => {
    const updatedGroup = groupedWords[contentTitle].filter((word)=> word.myWordId !== wordId);
    groupedWords[contentTitle] = updatedGroup[contentTitle];
  }

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
                              <DelBtn onClick={() => { delBtn(word.contentTitle,word.myWordId); }}>X</DelBtn>
                          </li>
                      ))}
                  </ul>
              </div>
          ))}
      </StyledWords>
  );
}

export default MkWords;
