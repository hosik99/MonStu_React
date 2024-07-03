import React, { useState } from "react";
import TitleList from '../service/TitleList';
import Content from '../service/Content';
import Modal from "react-modal";



function ContentPage(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <TitleList/>
            <Content/>
            <button onClick={openModal}>+</button>
            {/* onRequestClose={closeModal} -> 창 꺼질떄 작동하는 메소드 */}
            <Modal isOpen={isModalOpen}  contentLabel="Content Input Window">
                <h2>노트 작성</h2>
                <input type="text" name="title"></input>
                <textarea name="conten" rows="4" cols="30"></textarea>  {/*textarea가 화면크기를 변경해도 화면을 넘어가지 않게 CSS설정*/}
                <button onClick={closeModal}>Close Modal</button>
            </Modal>
        </div>
    );
}

export default ContentPage;