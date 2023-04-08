import React, { useRef } from 'react'
import styled from '@emotion/styled'
import { signIn } from '../api.js'

const Base = styled.div`
    
`;

const Input = styled.input`
    
`;

const Button = styled.button`
    
`;

export default function Signin() {
    const emailInput = useRef();
    const passwordInput = useRef();

    const onClick = (e) => {

    }

    const signinClick = async (e) => {
        console.log('로그인 버튼 클릭');

        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        await signIn({
            'email' : email,
            'password' : password
        })

    }

    return (
        <Base>Signin <br/>
            <Input data-testid="email-input" ref={emailInput}></Input>
            <Input data-testid="password-input" ref={passwordInput}></Input>
            <Button data-testid="signin-button" onClick={e => signinClick(e)}>로그인</Button>
            <Button data-testid="to-signup-button" onClick={e => onClick(e)}>회원가입</Button>
        </Base>
    )
}
