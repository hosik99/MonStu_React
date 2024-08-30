import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import LoadingPage from "../../components/LoadingPage";
import {loginController} from "../../hooks/controller/loginController";
import { containSpace, notNull } from "../../hooks/method/validation";
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
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

const StyledLink = styled(Link)`
    display: inline-block;
    padding: 6px 10px;
    margin-top: 10px;
    font-weight: bold ;
    font-size: 14px;
    color: #007bff; // 링크의 기본 색상
    background-color: #fff;
    border: 2px solid #007bff; // 버튼의 테두리 색상
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.3s ease, color 0.3s ease; // 천천히 변화

    &:hover {
        background-color: #007bff;
        color: #fff;
    }
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 5px;
    display: block;
`;
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
function LoginPage(){

    const navigate = useNavigate();
    const [valid,setValid] = useState('');
    const [loading,setLoading] = useState(false);

    //FORM DATA STYLE
    const [formData,setFormData] = useState({
        email : '',
        memberPw: '',
    });

    //SAVE FORM DATA TO LOCAL
    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData({ ...formData, [name]:value.trim()});
        setValid('');
    };

    const formDataValid = (data) => {
        console.log('data: ',data);
        if(containSpace(data.email) || !notNull(data.email))  return '이메일을 확인해 주세요.';
        if(containSpace(data.memberPw) || !notNull(data.memberPw))  return '비밀번호를 확인해 주세요.';
    }

    const saveData =async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        
        const validError = formDataValid(formData);
        if(validError){
            setValid(validError);
            return;
        }
        
        try {
            setLoading(true);
            const response = await loginController('/login','post',{
                email: formData.email,
                memberPw: formData.memberPw,
            });
            localStorage.setItem('authToken', response.data.token); //Login Token setting
            navigate('/',{replace:true}); // 성공 후 메인 페이지로 이동
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.status === 401) {
                    alert(error.response.data);
                } 
            } else {
                alert('Login Error');
            }
        }
        setLoading(false);
    };  

    if(loading){return <LoadingPage/>}

    return(
        <Container>
            <Form onSubmit={saveData}>
                <FormTitle>Login Page</FormTitle>
                <hr/>
                <br/>
                <FormGroup>
                    <Label>ID (email): </Label>
                    <Input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Password: </Label>
                    <Input type="password" name="memberPw" value={formData.memberPw} onChange={handleInputChange} />
                </FormGroup>
                {valid && <ErrorMessage>{valid}</ErrorMessage>}
                <Button type="submit">Login</Button>
                <StyledLink to="/login/signup">sign up</StyledLink>
            </Form>
        </Container>
    );
}

export default LoginPage;