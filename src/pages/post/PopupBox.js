import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

// PopupBox의 컨테이너 스타일
const Popup = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1000; // 팝업 박스가 다른 요소들 위에 나타나도록 높은 z-index 값을 부여
  pointer-events: none; // 팝업 박스가 마우스 이벤트(클릭 등)를 무시하도록 설정
`;

// 텍스트 영역 스타일
const TextArea = styled.div`
  background-color: #333; // 검정색 배경
  color: white;
  padding: 5px 10px;
  border-radius: 5px 0 0 5px; // 텍스트 영역의 왼쪽 모서리 둥글게
  font-size: 14px;
  display: flex;
  align-items: center;
`;


function PopupBox({ text, position }) {
  if (!position || !text) return null;

  return (
    <Popup style={{ top: position.top, left: position.left }}>
      <TextArea>{text}</TextArea>
    </Popup>
  );
}

export default PopupBox;
