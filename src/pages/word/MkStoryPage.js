import React, { useEffect, useState } from "react";
import { getWords } from "./communication/wordControllerC";
import MkWords from "./component/MkWords";
import AiContents from "./component/AiContents";
import Words from "./component/Words";

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