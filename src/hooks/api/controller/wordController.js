import { errorStatus, responseStatus } from "../../util/handleStatus";
import {connectSpring} from "../preAxios";

export const wordController = (url,type='get',data=null) => {

    const baseUrl = '/member/word';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

export const saveHistoryWords = async (list) => {
    try {
        const response = await wordController(`/save`, 'post', list);
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
}

// export const getWords = async (setWords) => {
//     try {
//         const response = await wordController(`/my`, 'get', null);
//         if (response && response.data) {
//             setWords(response.data);
//         } else if (response.status === 204) {
//             setWords(null);
//         } 
//     } catch (error) {
//         alert("데이터를 가져올 수 없습니다.");
//     }
// };

export const getWords = async (setWords) => {
    try {
        const response = await wordController(`/my`, 'get', null);
        console.log('ddd: '+response.data);
        return responseStatus(response,response.data);
    } catch (error) {
        return errorStatus(error);
    }
};

export const delWords = async (delList) => {
    try {
        const response = await wordController(`/del`, 'post',delList);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};
