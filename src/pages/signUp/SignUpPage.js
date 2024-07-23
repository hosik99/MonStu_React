import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { signUpController } from "../../contorller/signUpController";
import LoadingPage from "../LoadingPage";
import { useNavigate } from "react-router-dom";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
`;

const Form = styled.form`
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
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function SignUpPage(){

    const navigate = useNavigate();

    //FORM DATA LIST
    const [formData,setFormData] = useState({
        email : '',
        memberPw: '',
        birth: '',
        country: '',
        nickname: '',
        confirmPassword: '',
    });


    const [isEqualPw,setIsEqualPw] = useState(true);
    const [loading,setLoading] = useState(false);

    //SAVE FORM DATA TO LOCAL
    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value.trim()
        });
    };
        
    //CONFIRM PASSWORDS
    useEffect(() => {
        setIsEqualPw(formData.confirmPassword === formData.memberPw);
    }, [formData.confirmPassword, formData.memberPw]);

    //VAILDEING FORM DATA
    const formVaild = () => {
        if(formData.email==='') return true;
        if(formData.memberPw==='') return true;
        if(formData.nickname==='') return true;
        if(!isEqualPw) return true; //비밀번호 확인과 비밀번호가 같은지
    };

    //SENT FORM DATA TO SERVER
    const saveData =async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        if(formVaild()) return alert("입력을 다시 확인해주세요");    //폼 데이터 유효성 검사
        
        try {
            setLoading(true);
            const response = await signUpController('/signup','post',{
                memberDTO: {
                    email: formData.email,
                    memberPw: formData.memberPw,
                },
                memberInfoDTO: {
                    birth: new Date(formData.birth),
                    country: formData.country,
                    nickname: formData.nickname,
                },
            });
            if(response && response.data){
                alert(response.data);
                navigate('/',{replace:true}); // 성공 후 메인 페이지로 이동
            }
            
        } catch (error) {
            if(error && error.response.data){alert(error.response.data);}
        }
        setLoading(false);
    };  

    if(loading){return <LoadingPage/>}

    return(
        <Container>
            <Form onSubmit={saveData}>
                <FormTitle>Sign Up</FormTitle>
                <hr/>
                <br/>
                <FormGroup>
                    <Label>ID (email): </Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
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
                <Button type="submit">Sign Up</Button>
            </Form>
        </Container>
    );
}

export default SignUpPage;