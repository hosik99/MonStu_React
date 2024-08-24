import { connectSpring } from "../api/preAxios";

export const translationController = (url,type='get',data=null) => {

    const baseUrl = '/api';

    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}