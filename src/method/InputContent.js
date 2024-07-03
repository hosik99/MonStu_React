import React from "react";
import ReactModal from "react-modal";

// 애플리케이션 루트 엘리먼트 설정
Modal.setAppElement('#root');

function InputContent({isOpen,onRequestClose,contentLabel,children}){

    return(
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                },
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)"
                }
            }}
        >
            {children}
        </ReactModal>
    );
    
}

