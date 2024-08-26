import React, { useEffect } from "react";
import styled from "styled-components";

const StyledWord = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #8561c5; /* 보라색 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

function MyWords({myWordDTOList}){
    return(
        <StyledWord>
            {Array.isArray(myWordDTOList) ? (
                myWordDTOList.map((data) => (
                <div key={data.myWordId}>{data.targetWord}  -  {data.translatedWord}</div>
                ))
            ) : (
                <div>{myWordDTOList}</div>
            )}
        </StyledWord>
    );
}

export default MyWords;