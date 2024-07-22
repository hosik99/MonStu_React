import React,{useState,useEffect} from "react";

function TitleList(){
    
    const [tempList,setTempList] = useState([]);

    //Show Titles 
    const tempListItme = tempList.map((value,index)=> 
        <li key={index}>{value}</li>
    ) 

    return(
        <div>
            <ol>{tempListItme}</ol>
        </div>
    );
}

export default TitleList;