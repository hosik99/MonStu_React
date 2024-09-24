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

