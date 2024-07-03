import React, { useState } from "react";

function Content(){

    const [tempList,setTempList] = useState('awwwwwwwwwwwffffasfsaawwwwwwwwwwwffffasfsaawwwwwwwwwwwffffasfsaawwwwwwwwwwwffffasfsa');

    return(
        <div>
            {tempList}
        </div>
    );
}

export default Content;