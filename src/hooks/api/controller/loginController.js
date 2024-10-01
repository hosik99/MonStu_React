import { errorStatus, responseStatus } from "../../util/handleStatus";
import {connectSpring} from "../preAxios";

const loginController = (url,type='get',data=null) => {

    const baseUrl = '/auth';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

// LOGIN
export const login = async (email,memberPw) => {
    try {
        const response = await loginController('/login','post',{
            email: email,
            memberPw: memberPw,
        });
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
};  