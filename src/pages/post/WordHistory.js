import { useScrollTrigger } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { myWordController } from "../../contorller/myWordController";

const List = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #b4b2d8; /* 회색 */
`;
/*
  useRef는 초기값을 설정할 수 있으며, 이 값은 .current 속성에 저장
  컴포넌트의 상태를 유지하거나 DOM 노드를 참조하는 데 사용,
  컴포넌트가 다시 렌더링될 때 값이 유지되는 객체를 생성
  값이 변경되어도 컴포넌트는 다시 렌더링되지 않습니다.
*/
/*
  <history Entity>
  private Long myWordId;
  private String targetWord;
  private String translatedWord;
*/
function WordHistory({list}){

  const [checkedItems, setCheckedItems] = useState([]);
  const checkedItemsRef = useRef(checkedItems); 

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    setCheckedItems((prevItems) => {
      const updatedItems = checked
        ? [...prevItems, item]  //체크 시 요소 추가
        : prevItems.filter((i) => i !== item);  //체크 해제 시 요소 삭제
      checkedItemsRef.current = updatedItems; // 상태를 ref에 업데이트
      return updatedItems;  //setCheckedItems 설정
    });
  };

  const saveCheckedItems = async () => {
    console.log(`checkedItems -> ${checkedItemsRef.current}`);
    checkedItemsRef.current.forEach(item => {
      console.log(item);
    });
    try {
      const response = await myWordController(`/savewords`, 'post', checkedItemsRef.current);
      if (response && response.data) {
        console.log(response.data);
      }
    } catch (error) {
        console.log(`error : ${error.message}`);
    }
  };

  useEffect(()=>{
    return() => {
      console.log('History Component is closed');
      console.log('save-checkedItems.length : ' + checkedItemsRef.current.length);
      console.log('checkedItemsRef.current : '+checkedItemsRef.current);
      if( checkedItemsRef.current.length > 0 ) saveCheckedItems();
    }
  },[])

  return(
      <List>
          {Array.isArray(list) && list.length > 0 ? (
            list.map((history,index) => (
              <div key={index}>
                <label htmlFor={`checkbox${index}`}> 
                  {history.targetWord} - {history.translatedWord}
                </label>
                <input type="checkbox" id={`checkbox${index}`} onChange={(e) => handleCheckboxChange(e, history)}/>
              </div>
            ))
          ) : (
            <div>no Data</div>
          )}
      </List>
  );
}

export default WordHistory;