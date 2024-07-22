import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { signUpController } from "../contorller/signUpController"

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

function SignUpPage(){
    
    const [formData,setFormData] = useState({
        email : '',
        userPw: '',
        birth: '',
        country: '',
        nickname: '',
    });

    const [confirmPassword,setConfirmPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };
    const handleConPwChange = (event) => {setConfirmPassword(event.target.value)};

    const saveData =async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        try {
            setLoading(true);
            const response = await signUpController('/signup','post',{
                formData,
            });
            alert(response.data);
        } catch (error) {
            if(error && error.response.data){alert(error.response.data);}
        }
        setLoading(false);
    };  

    return(
        <Container>
            <Form onSubmit={saveData}>
                <FormTitle>Sign Up</FormTitle>
                <hr/>
                <br/>
                <FormGroup>
                    <Label>ID (email): </Label>
                    <Input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Password: </Label>
                    <Input type="password" name="userPw" value={formData.userPw} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password: </Label>
                    <Input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConPwChange} />
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