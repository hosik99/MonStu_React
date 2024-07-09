import React from "react";

function PwQuizList(proprs){

    const {dataList} = proprs;

    return(
      <div>
        {dataList.map((item) => (
          <li key={item.qid}>
              {item.quiz}
          </li>
        ))}
      </div>
    );
}

export default PwQuizList;