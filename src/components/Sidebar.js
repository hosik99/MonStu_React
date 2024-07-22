import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.aside`
    background: #ddd;
    padding: 20px;
    flex: 0 0 20px; //고정 너비
`;

function Sidebar(){
  return(
    <StyledSidebar>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
  </StyledSidebar>
  )
}

export default Sidebar;