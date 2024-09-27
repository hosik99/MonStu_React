import { errorStatus, responseStatus } from "../../util/handleStatus";
import {connectSpring} from "../preAxios";

export const aiContentController = (url,type='get',data=null) => {

    const baseUrl = '/member/aicon';

    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

//하나의 AiContent 삭제
export const del = async (id) => {
    try {
        const response = await aiContentController(`/del`, 'post',id);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

export const creAicon = async (wordList) => {
    try {
        const response = await aiContentController(`/api/con`, 'post',wordList);
        return responseStatus(response,response.data.apiResponse);
    }catch(error){
        return errorStatus(error);
    }     
};

//사용자의 모든 AiContent 가져오기
export const getAllAiContent = async () => {
    try {
        const response = await aiContentController(`/getAll`, 'get',null);
        return responseStatus(response,response.data.aiContentDTOList);
    }catch(error){
        return errorStatus(error);
    }     
};