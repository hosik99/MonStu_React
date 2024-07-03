import React, { useState } from "react";
import { pwQuizController } from "../contorller/pwQuizController";


//<Route path="/admin/pwquiz" element={<PwQuizPage/>}></Route>
function PwQuizPage(){
    
    const [dataList,setDataList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                setError(null);
                setDataList(null);
                setLoading(true);

                const response = await axios.get('https://dummyjson.com/products?limit=0');
                setData(response.data.products);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    function findAllPwQuiz(){
        pwQuizController('/findAllPwQuiz')
            .then((response) => console.log(response.data))
            .catch((error) => console.log('error'))
    }

    return(
        <div>
          <button onClick={findAllPwQuiz}>
              ++
          </button>
      </div>
    );
}

export default PwQuizPage;