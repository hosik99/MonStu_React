import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {checkEmail, save, sendEmailCheck, signUpController} from "../../hooks/api/controller/signUpController";
import MsgPopup from "../../components/popupBox/MsgPopup";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
`;

const Form = styled.div`
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
`;

const FormTitle = styled.h2`
    margin-bottom: 20px;
    text-align: center;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const SubFormGroup = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 5px;
    display: block;
`;

const SubButton = styled.button`
    width: 20%;
    padding: 10px;
    background-color: ${props => props.disabled ? '#6c757d' : '#007bff'};
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => props.disabled ? '#6c757d' : '#0056b3'};
    }
`;
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function SignUpPage(){

    const navigate = useNavigate();

    //FORM DATA LIST
    const [formData,setFormData] = useState({
        email : '',
        emailCheck : '',
        memberPw: '',
        birth: '',
        country: '',
        nickname: '',
        confirmPassword: '',
    });

    const [isEqualPw,setIsEqualPw] = useState(true);
    const [checkCode,setCheckCode] = useState('no code');   //Email checkCode
    const [isChecked,setIsChecked] = useState(false);       //is same emailcode? 
    const [isExistsEmail,setIsExistsEmail] = useState(true);
    const [msg,setMsg] = useState('');
    const [msgId,setMsgId] = useState(0);

    //SAVE FORM DATA TO LOCAL
    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value.trim()
        });
    };
        
    //CONFIRM PASSWORDS, CKECKCODE
    useEffect(() => {
        setIsEqualPw(formData.confirmPassword === formData.memberPw);
        setIsChecked(formData.emailCheck === checkCode);
    }, [
        formData.confirmPassword, 
        formData.memberPw,
        formData.emailCheck
    ]);

    //VAILDEING FORM DATA
    const formVaild = () => {
        if(formData.email==='') return '이메일을 다시 확인해주세요.';
        if(formData.memberPw==='') return '비밀번호를 다시 확인해주세요';
        if(formData.nickname==='') return '닉네임을 다시 확인해주세요';
        if(!isEqualPw) return '비밀번호가 일치하지 않습니다.'; //확인비밀번호와 비밀번호가 같은지 확인
        if(!isChecked) return '이메일 인증 코드가 일치하지 않습니다.';  //이메일 인증 코드 같은지 확인
        return null;
    };

    // //VERIFY EMAIL ALREADY EXISTS
    const checkEmailBtn = async () => {
        if(formData.email==='') return alert('이메일을 입력해 주세요.');

        const result = await checkEmail(formData.email);
        if(result.success){
            setIsExistsEmail(false);
            setMsg(result.message);
        }else{
            setIsExistsEmail(true);
            setMsg(result.message);
        }
        setMsgId(msgId+1);
    }

    const emailCheck = async () => {
        if(formData.email==='') return alert('이메일을 입력해 주세요.');

        const result = await sendEmailCheck(formData.email);
        if(result.success){
            setCheckCode(result.data);
            setMsg(result.message);
        }else{
            setMsg(result.message);
        }
    }

    // //SENT FORM DATA TO SERVER
    // const saveData =async (e) => {
    //     // e.preventDefault(); // 기본 폼 제출 방지
    //     let vaildMsg = formVaild();
    //     if(vaildMsg) return alert(vaildMsg);    //폼 데이터 유효성 검사
        
    //     try {
    //         const response = await signUpController('/signup','post',{
    //             memberDTO: {
    //                 email: formData.email,
    //                 memberPw: formData.memberPw,
    //             },
    //             memberInfoDTO: {
    //                 birth: new Date(formData.birth),
    //                 country: formData.country,
    //                 nickname: formData.nickname,
    //             },
    //         });
    //         if(response && response.data){
    //             alert(response.data);
    //             navigate('/',{replace:true}); // 성공 후 메인 페이지로 이동
    //         }
            
    //     } catch (error) {
    //         if(error && error.response.data){alert(error.response.data);}
    //     }
    // };  

    //SENT FORM DATA TO SERVER
    const saveData = async () => {
        let vaildMsg = formVaild();
        if(vaildMsg) return alert(vaildMsg);    //폼 데이터 유효성 검사
        
        const result = await save(formData);
        if(result.success){
            navigate('/',{replace:true}); // 성공 후 메인 페이지로 이동
        }else{
            setMsg(result.message);
        }
    }

    return(
        <Container>
            <Form>
                <FormTitle>Sign Up</FormTitle>
                <hr/>
                <br/>
                <FormGroup>
                    <Label>ID (email): </Label> 
                    <SubFormGroup>
                        <Input type="email" name="email" value={formData.email} onChange={handleInputChange} readOnly={!isExistsEmail}/>
                        <SubButton onClick={checkEmailBtn} disabled={!isExistsEmail}>
                        {!isExistsEmail ? '✓' : 'Check'}
                        </SubButton>
                    </SubFormGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Email Authentication Code: </Label>
                    <SubFormGroup>
                        <Input type="text" name="emailCheck" value={formData.emailCheck} onChange={handleInputChange} />
                        <SubButton onClick={emailCheck}>Send</SubButton>
                    </SubFormGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Password: </Label>
                    <Input type="password" name="memberPw" value={formData.memberPw} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password: </Label>
                    {!isEqualPw && <ErrorMessage>The password is Difference</ErrorMessage>} {/*PASSWORD ERROR MSG*/}
                    <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Birthday: </Label>
                    <Input type="date" name="birth" value={formData.birth} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Country: </Label>
                    <Input type="text" name="country" value={formData.country} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Nickname: </Label>
                    <Input type="text" name="nickname" value={formData.nickname} onChange={handleInputChange} />
                </FormGroup>
                <Button onClick={saveData}>Sign Up</Button>
            </Form>
            <MsgPopup msg={msg} id={msgId}/>
        </Container>
    );
}

export default SignUpPage;