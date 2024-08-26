
/*
    ContentPage.js에서 사용
    번역할 Text요소를 검증 - 번역할 요소가 없을 시 false를 반환
*/
export function validTranText(text){
    if(typeof text !== 'string' && text !== null) return false;
    const eng_regex = /[a-zA-Z]/;   //RegExp 객체
    return eng_regex.test(text);
}

export function containSpace(text){
    const space_regex = /\s/;
    return typeof text === 'string' && space_regex.test(text);
}