import {connectSpring} from "../api/preAxios";

export const aiContentController = (url,type='get',data=null) => {

    const baseUrl = '/member/aicon';

    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}