import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// 팝업 나타나는 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);  // 살짝 아래서 위로 올라오도록
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 팝업 사라지는 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);  // 사라질 때 아래로 내려가듯이
  }
`;

// 팝업 컨테이너 스타일
const PopupContainer = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.6s forwards;
  transition: opacity 0.6s ease-in-out;
  font-size: 16px;  // 폰트 크기
  font-weight: 500; // 폰트 두께
  text-align: center;
  max-width: 80%;    // 화면에서 너무 커지지 않도록 제한
  min-width: 250px;
`;

// 닫기 버튼 스타일
const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #f00;  // 호버 시 빨간색으로 변하게
  }
`;

/*
  짧은 메세지를 특정 시간 동안 화면 중앙 하단에 표시합니다.
*/
function MsgPopup({msg,time = 3000,id}) {

    const [isOpen,setIsOpen] = useState(false);

    useEffect(()=>{
            if(msg){
                setIsOpen(true);
                const timer = setTimeout(() => {
                                setIsOpen(false);
                            }, time);
                return () => clearTimeout(timer);
            }
    },[msg,id]);

    if(!msg || !isOpen) return null;

    return (
      <PopupContainer isOpen={isOpen}>
        {msg}
        <CloseBtn onClick={()=>setIsOpen(false)}>X</CloseBtn>
      </PopupContainer>
    )
}

export default MsgPopup;