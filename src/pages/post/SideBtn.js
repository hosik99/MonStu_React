import React from "react";
import styled from "styled-components";

const SideMenu = styled.div`
  background-color: #e66464; /* 빨간색 */
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

function SideBtn(){
    return(
        <SideMenu>
            <button>버튼1</button>
            <button>버튼2</button>
            <button>버튼3</button>
            <button>버튼4</button>
        </SideMenu>
    );
}

export default SideBtn;