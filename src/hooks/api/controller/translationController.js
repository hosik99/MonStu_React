import { validTranText } from "../../util/validation";
import {connectSpring} from "../preAxios";

export const translationController = (url,type='get',data=null) => {

    const baseUrl = '/tr';

    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

//REQUEST TO PAPAGO API
export const translationWord = async (selectText,setTranslatedText,addToHistory) => {
    // if (!validTranText(selectText)) return null; // Text가 영어인지 확인

    try {
        const response = await translationController(`/api/translation`, "post", {
            source: "en", // 원본 언어 (auto 사용시 자동으로 소스 감지)
            target: "ko", // 번역 될 언어 코드
            text: selectText, // 1회 최대 5,000자 까지
        });
        if (response && response.data) {
            const result = response.data.message.result;
            console.log('result: '+result);
            setTranslatedText(result.translatedText);
            if (selectText !== result.translatedText) addToHistory(result.myWordId, selectText, result.translatedText); // 번역 되었을 경우
        }
    } catch (error) {
        console.log(`error : ${error.message}`);
    }
};

  