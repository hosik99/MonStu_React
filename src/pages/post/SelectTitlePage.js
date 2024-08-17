import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import { contentController } from "../../contorller/contentController";
import SideBtn from "./SideBtn";
import AddContentModal from "./AddContentModal";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ListContainer = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #b4b2d8; /* 회색 */
`;

const StyledLink = styled(Link)`
    display: block; /* 링크가 전체 블록처럼 행동하게 합니다 */
    background: #fff; /* 항목 배경 색상 */
    margin: 5px 0;
    padding: 15px; /* 패딩을 늘려서 링크의 클릭 영역을 확장 */
    border-radius: 8px; /* 모서리를 더 둥글게 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
    text-decoration: none; /* 링크의 기본 밑줄 제거 */
    color: #333; /* 기본 글자 색상 */
    font-size: 16px; /* 글자 크기 설정 */
    font-weight: 500; /* 글자 두께 설정 */
    transition: background-color 0.3s ease, box-shadow 0.3s ease; /* 배경색과 그림자 변화에 애니메이션 추가 */
    
    &:hover {
        background-color: #f0f0f0; /* 마우스를 올렸을 때 배경색 변화 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 마우스를 올렸을 때 그림자 증가 */
    }
    
    &:active {
        background-color: #e0e0e0; /* 클릭할 때 배경색 변화 */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 감소 */
    }
`;

function SelectTitlePage(){

    const [contents,setContents] = useState([]);
    const [isEmpty,setIsEmpty] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {setIsModalOpen(true);};
    const closeModal = () => {setIsModalOpen(false);};

    useEffect (()=> {
        
        getContents();
    },[]);

    const getContents =async (e) => {

      try {
          const response = await contentController('/getContents','get',{});
          if(response && response.data){
              setContents(response.data.contentDTOList);
          }else if(response.status === 204){   //검색되는 데이터가 없을때
              setIsEmpty(true);
          } 
      } catch (error) {
          if(error){ alert('데이터를 가져올 수 없습니다.'); }
      }
    };  

    return (
        <Container>
          <Header/>
            <button onClick={openModal}>Add New Content</button>
            <AddContentModal closeModal={closeModal} isModalOpen={isModalOpen}/>
            <ListContainer>
                <ul>
                    {contents.map((content) => (
                        <StyledLink to={`/content/${content.contentId}`}>{content.title}</StyledLink>
                    ))}
                </ul>
            </ListContainer>
        </Container>
    );
}

export default SelectTitlePage;