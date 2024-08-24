import { connectSpring } from "../api/preAxios";

export const myWordController = (url,type='get',data=null) => {

    const baseUrl = '/member/myword';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

