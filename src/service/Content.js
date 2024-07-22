import React, { useState } from "react";

function Content(){

    const [tempList,setTempList] = useState([]);

    return(
        <div>
            {tempList}
        </div>
    );
}

export default Content;