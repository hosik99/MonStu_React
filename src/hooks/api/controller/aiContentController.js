import { errorStatus, responseStatus } from "../../util/handleStatus";
import {connectSpring} from "../preAxios";

const aiContentController = (url,type='get',data=null) => {

    const baseUrl = '/member/aicon';

    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

//DELETE AiContent
export const del = async (id) => {
    try {
        const response = await aiContentController(`/del`, 'post',id);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

//CREATE NEW CONTENT BY AI
export const cre = async (wordList) => {
    try {
        console.log('wordList: '+wordList.toString());
        const response = await aiContentController(`/api/con`, 'post',wordList);
        return responseStatus(response,response.data.apiResponse);
    }catch(error){
        return errorStatus(error);
    }     
};

//GET ALL AI CONTENT USING MEMBER ID
export const getAll = async () => {
    try {
        const response = await aiContentController(`/getAll`, 'get',null);
        return responseStatus(response,response.data.aiContentDTOList);
    }catch(error){
        return errorStatus(error);
    }     
};