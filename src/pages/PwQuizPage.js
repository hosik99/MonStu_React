import React, { useState,useEffect } from "react";
import { pwQuizController } from "../contorller/pwQuizController";
import Loading from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import PwQuizList from "../components/PwQuizList";
import PwQuizForm from "./PwQuizForm";
import { Snackbar } from "@mui/material";
import LoadingPage from "./LoadingPage";


//<Route path="/admin/pwquiz" element={<PwQuizPage/>}></Route>
function PwQuizPage(){
    
    const [dataList,setDataList] = useState([]);
    const [pwQuiz, setPwQuiz] = useState('');
    const [snackBmsg,setSnackBmsg] = useState('')

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSnackB, setIsSnackB] = useState(false);

    const openModal = () => {setIsModalOpen(true);};
    const closeModal = () => {setIsModalOpen(false);};

    const openSnackB = () => {setIsSnackB(true);};
    const closeSnackB = () => {setIsSnackB(false);};

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
    },[isModalOpen]);

    if(loading){return <LoadingPage/>}
    if(error){return <ErrorPage/>}
    if(!dataList){return null;}

    return(
        <div>
            <PwQuizList dataList={dataList} />
            <button onClick={openModal}>+</button>
            <PwQuizForm isModalOpen={isModalOpen} closeModal={closeModal}
                openSnackB={openSnackB} setSnackBmsg={setSnackBmsg} setPwQuiz={setPwQuiz}/>
            <Snackbar open={isSnackB} 
                autoHideDuration={2000} 
                onClose={closeSnackB} 
                message={snackBmsg}/>
        </div>
    );
}

export default PwQuizPage;