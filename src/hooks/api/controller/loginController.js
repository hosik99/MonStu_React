import { errorStatus, responseStatus } from "../../util/handleStatus";
import {connectSpring} from "../preAxios";

export const loginController = (url,type='get',data=null) => {

    const baseUrl = '/auth';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

export const save = async (email,memberPw) => {
    try {
        const response = await loginController('/login','post',{
            email: email,
            memberPw: memberPw,
        });
        localStorage.setItem('authToken', response.data.token); //Login Token setting
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
};  

