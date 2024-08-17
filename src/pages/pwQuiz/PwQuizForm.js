import React, { useState } from "react";
import Modal from "react-modal";
import { pwQuizController } from "../../contorller/pwQuizController";
import { Snackbar } from "@mui/material";

// Modal.setAppElement('#root');

function PwQuizForm(props){

    const {isModalOpen,closeModal,openSnackB,setSnackBmsg} = props;

    const [newPwQuiz,setNewPwQuiz] = useState('');

    const handleInput = (e) => {
        setNewPwQuiz(e.target.value);
        console.log(newPwQuiz);
    }

    const saveData =async () => {
        if(newPwQuiz.trim() === '') return alert('입력창이 비어있습니다.');
        try {
            const response = await pwQuizController('/savePwQuiz','post',{
                'quiz' : newPwQuiz,
            });
            setSnackBmsg(response.data);
            openSnackB();
            closeModal();
        } catch (error) {
            if(error && error.response.data){
                alert(error.response.data);
            }else{
                alert('새로고침 후 다시 시도해 주시기 바랍니다.');
            }
        }
    };

    return(
        <Modal isOpen={isModalOpen}  contentLabel="Content Input Window" ariaHideApp={false}>
            <form onSubmit={saveData}> 
                <label>Add PwQuiz</label>
                <textarea value={newPwQuiz} rows="4" cols="30" onChange={handleInput} autoFocus></textarea>  {/*textarea가 화면크기를 변경해도 화면을 넘어가지 않게 CSS설정*/}
            </form>
            <button onClick={saveData}>Add</button>
            <button onClick={closeModal}>Close</button>
        </Modal>
    );
}

export default PwQuizForm;