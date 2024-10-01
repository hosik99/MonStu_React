import { errorStatus, responseStatus } from "../../util/handleStatus";
import {connectSpring} from "../preAxios";

const wordController = (url,type='get',data=null) => {

    const baseUrl = '/member/word';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

//SAVE HISTORY WORDS
export const saveHistoryWords = async (list) => {
    try {
        const response = await wordController(`/save`, 'post', list);
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
}

//GET ALL HISTORY WORDS BY MEMBER ID
export const getAll = async () => {
    try {
        const response = await wordController(`/my`, 'get', null);
        return responseStatus(response,response.data);
    } catch (error) {
        return errorStatus(error);
    }
};

//DELETE WORDS
export const del = async (delList) => {
    try {
        const response = await wordController(`/del`, 'post',delList);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};
