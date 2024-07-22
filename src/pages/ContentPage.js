import React, { useState } from "react";
import TitleList from '../service/TitleList';
import Content from '../service/Content';
import AddContentModal from "./AddContentModal";


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
            <button onClick={openModal}>Add New Content</button>
            <AddContentModal closeModal={closeModal} isModalOpen={isModalOpen}/>
        </div>
    );
}

export default ContentPage;