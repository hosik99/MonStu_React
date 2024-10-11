import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import AddContentModal from "./component/AddContentModal";
import { getContents } from "../../hooks/api/controller/contentController";
import MsgPopup from "../../components/popupBox/MsgPopup";


/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const ListContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const StyledLink = styled(Link)`
  display: inline-block; /* 내용에 맞춰 크기 조절 */
  background: #ffffff;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  
  /* 너무 길어지지 않게 최대 너비 제한 */
  max-width: 90%; /* 전체 컨테이너의 90%로 제한 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #f0f0f0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;


const AddButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }
`;

function SelectTitlePage() {
  const [contents, setContents] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg,setMsg] = useState('');

  const openModal = () => { setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); };

  useEffect(() => {
    fetchContents();
  }, []);

  //REQUEST CONTENT DATA TO SPRING 
  const fetchContents = async () => {
    const result = await getContents();
    if(result.success){
      setContents(result.data?.contentDTOList);
      if(result.data) setIsEmpty(false);
    }else{
      setIsEmpty(true);
    }
  };

  return (
    <Container>
      <Header />
      <AddButton onClick={openModal}>Add New Content</AddButton>
      <AddContentModal closeModal={closeModal} isModalOpen={isModalOpen} fetchContents={fetchContents} setMsg={setMsg}/>
      <ListContainer>
        <ul>
          {contents.map((content) => (
            <li key={content.contentId}>
              <StyledLink to={`/content/${content.contentId}`}>
                {content.title}
              </StyledLink>
            </li>
          ))}
        </ul>
        {isEmpty && <p>No content available</p>}
      </ListContainer>
      <MsgPopup msg={msg}/>
    </Container>
  );
}

export default SelectTitlePage;
