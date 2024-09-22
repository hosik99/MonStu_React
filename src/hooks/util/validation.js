
//영어 문자열 확인
export function validTranText(text){
    if(typeof text !== 'string' && text !== null) return false;
    const eng_regex = /[a-zA-Z]/;   //RegExp 객체
    return eng_regex.test(text);
}

// ' '가 포함되어있는지 확인
export function containSpace(text){
    const space_regex = /\s/;
    return typeof text === 'string' && space_regex.test(text);
}

export function notNull(input){
    if(input.trim() !== '') return true;
}

