import { connectSpring } from "../api/preAxios";

export const contentController = (url,type='get',data=null) => {
    
    const baseUrl = '/member/content';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}
