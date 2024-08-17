import { connectSpring } from "../api/preAxios";

/*
    비동기 요청을 취소하는 클린업 함수 -> axios에서는 CancelToken을 사용하여 요청을 취소할 수 있습니다. CancelToken을 사용하면 요청을 생성할 때 취소할 수 있는 토큰을 전달하고, 필요에 따라 요청을 취소할 수 있습니다.
*/
export const contentController = (url,type='get',data=null) => {
    
    const baseUrl = '/member/content';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}
