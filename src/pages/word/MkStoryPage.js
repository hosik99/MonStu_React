import React, { useEffect, useState } from "react";
import MkWords from "./component/MkWords";
import AiContents from "./component/AiContents";
import Words from "./component/Words";
import { getWords } from "../../hooks/api/controller/wordController";

function MkStoryPage(){

    const [words,setWords] = useState([]);

    useEffect(()=>{
        getWords(setWords);
    },[]);

    return(
        <div>
            {/* <Words words={words} selList={selList}/> */}
            <AiContents/>
        </div>
    );
}

export default MkStoryPage;