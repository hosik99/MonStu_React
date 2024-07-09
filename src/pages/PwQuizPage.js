import React, { useState,useEffect } from "react";
import { pwQuizController } from "../contorller/pwQuizController";
import Loading from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import PwQuizList from "../components/PwQuizList";
import PwQuizForm from "./PwQuizForm";


//<Route path="/admin/pwquiz" element={<PwQuizPage/>}></Route>
function PwQuizPage(){
    
    const [dataList,setDataList] = useState([]);
    const [pwQuiz, setPwQuiz] = useState('');

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                setError(null);
                setDataList(null);
                setLoading(true);

                const response = await pwQuizController('/findAllPwQuiz');
                setDataList(response.data);
                console.log(response.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    if(loading){return <Loading/>}
    if(error){return <ErrorPage/>}
    if(!dataList){return null;}

    return(
        <div>
            <PwQuizList dataList={dataList} />
            <button onClick={openModal}>+</button>
            <PwQuizForm isModalOpen={isModalOpen} closeModal={closeModal} setPwQuiz={setPwQuiz}/>
            
        </div>
    );
}

export default PwQuizPage;