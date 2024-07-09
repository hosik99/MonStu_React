import { connectSpring } from "../api/preAxios";

export const pwQuizController = (url,type='get',data=null) => {

    const baseUrl = '/admin/pwquiz';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

