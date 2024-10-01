import {responseStatus,errorStatus} from "../../util/handleStatus";
import {connectSpring} from "../preAxios";

const translationController = (url,type='get',data=null) => {

    const baseUrl = '/tr';

    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

//REQUEST TO PAPAGO API
export const translationWord = async (selectText) => {
    try {
        const response = await translationController(`/api/translation`, "post", {
            source: "en", // 원본 언어 (auto 사용시 자동으로 소스 감지)
            target: "ko", // 번역 될 언어 코드
            text: selectText, // 1회 최대 5,000자 까지
        });
        return responseStatus(response,response.data.message.result);
    } catch (error) {
        return errorStatus(error);
    }
};


