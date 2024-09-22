import { wordController } from "../../../hooks/api/controller/wordController";



export const getWords = async (setWords) => {
    try {
        const response = await wordController(`/my`, 'get', null);
        if (response && response.data) {
            setWords(response.data);
            console.log('List: '+response.data);
        } else if (response.status === 204) {
            alert('데이터가 없습니다.');
        } 
    } catch (error) {
        alert("데이터를 가져올 수 없습니다.");
    }
};

export const delWords = async (delList) => {
    try {
        const response = await wordController(`/del`, 'post',delList);
    }catch(e){
      alert('에러가 발생했습니다.');
      console.log('error - {}',e);
    }     
};

