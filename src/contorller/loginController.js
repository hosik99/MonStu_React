import { connectSpring } from "../api/preAxios";

export const loginController = (url,type='get',data=null) => {

    const baseUrl = '/auth';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

