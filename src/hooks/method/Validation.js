
/*
    글자의 길이에 제한
    limit -> 'max'와 'min' 사용 가능 (default값 'min')
    checkLength(값,제한길이 지정,'max')
*/

let valid = {};

export const getValid = () =>{
    valid = {};
    return valid;
}

export const checkLength = (valueName,value,max,min=0) => {
    if(value.length < min) valid[valueName] = `${min}자 이상 입력해야합니다.`;
    if(value.length > max) valid[valueName] =  `${max}자 이하로 입력해야합니다.`;
}

export const notNull = (valueName,value) => {
    if( value==null || value.trim() =='') valid[valueName] = "입력이 비어있습니다.";
}

//이메일 형식 확인
/*
    emailPattern.test(value): value가 정규 표현식 emailPattern과 일치하는지 검사합니다.
    ^: 문자열의 시작을 의미,
    [^\s@]+: 공백 문자나 @ 문자가 아닌 문자가 한 글자 이상 있어야
    ^ (대괄호 내): 부정을 의미합니다 (즉, 공백이나 @가 아닌 문자).
    \s: 공백 문자를 의미합니다.
    @: @ 문자를 의미합니다.
    [^\s@]+: 다시 공백 문자나 @ 문자가 아닌 문자가 한 글자 이상 있어야 합니다.
    \.: . 문자가 반드시 있어야 합니다 (백슬래시 \는 점을 이스케이프하여 문자 그대로의 .을 의미합니다).
    [^\s@]+: 다시 공백 문자나 @ 문자가 아닌 문자가 한 글자 이상 있어야 합니다.
    $: 문자열의 끝을 의미합니다.
*/
export const isEmail = (valueName,value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value) ? false : valid[valueName] = "유효한 이메일 주소를 입력하세요.";
}

