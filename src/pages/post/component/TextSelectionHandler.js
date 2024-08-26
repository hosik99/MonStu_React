import React from "react";

const TextSelectionHandler = {
    //PopupBox 위치 선정
    setUpTextSelectionHandler(setSelectText, setPopupBoxPosition){
        document.addEventListener('mouseup',()=> {
            const selection = window.getSelection(); //selection 객체
            const selectedText = selection.toString().trim();

            if(selectedText){
                setSelectText(selectedText);    //부모의 setSelectText 설정

                // 텍스트 위치 계산
                const range = selection.getRangeAt(0);  //사용자가 선택한 첫 번째 텍스트 범위를 나타내는 Range 객체를 가져옴
                const rect = range.getBoundingClientRect(); //선택된 텍스트 영역의 위치와 크기를 포함한 DOMRect 객체 반환 (top, left, right, bottom, width, height 등의 정보)
                setPopupBoxPosition({
                    top: rect.top + window.screenY - 30,  // 팝업 박스가 텍스트 위에 위치하도록 조정
                    left: rect.left + window.screenX + rect.width / 3,  // 텍스트의 가로위치
                });
            }else{
                setPopupBoxPosition(null);  // 선택 취소 시 팝업 박스 숨김
            }
        });
    },

    cleanupTextSelectionHandler(){
        document.removeEventListener('mouseup',this.setUpTextSelectionHandler);
    }
};

export default TextSelectionHandler;