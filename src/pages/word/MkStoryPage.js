import React, { useEffect, useState } from "react";
import AiContents from "./component/AiContents";
import { getAll } from "../../hooks/api/controller/wordController";

function MkStoryPage(){

    const [words,setWords] = useState([]);

    useEffect(()=>{
        getAll(setWords);
    },[]);

    return(
        <div>
            {/* <Words words={words} selList={selList}/> */}
            <AiContents/>
        </div>
    );
}

export default MkStoryPage;