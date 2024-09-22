import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// 팝업 컨테이너 스타일
const PopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.5s forwards;
  transition: opacity 0.5s ease-in-out;
`;

function MsgPopup({msg,time = 3000}) {

    const [isOpen,setIsOpen] = useState(false);

    // const openPopup = () => { setIsOpen(true); }
    // const closePopup = () => { setIsOpen(false); }

    useEffect(()=>{
            if(msg){
                setIsOpen(true);
                const timer = setTimeout(() => {
                                setIsOpen(false);
                            }, time);
                return () => clearTimeout(timer);
            }
    },[msg]);

    if(!msg || !isOpen) return null;

    return <PopupContainer isOpen={isOpen}>{msg}</PopupContainer> ;
}

export default MsgPopup;