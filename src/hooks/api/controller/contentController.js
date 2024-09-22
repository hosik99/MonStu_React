import {connectSpring} from "../preAxios";
import {responseStatus,errorStatus} from "../../util/handleStatus";

export const contentController = (url,type='get',data=null) => {
    
    const baseUrl = '/member/content';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

export const saveData =async (title,content) => {
    try {
        const response = await contentController('/add','post',{
            'title' : title,
            'content' : content,
        });
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
};  
