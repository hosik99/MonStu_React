import {connectSpring} from "../api/preAxios";

export const signUpController = (url,type='get',data=null) => {

    const baseUrl = '/sign';

    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}