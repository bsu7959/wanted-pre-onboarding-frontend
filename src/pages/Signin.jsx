import React from 'react'
import styled from '@emotion/styled'

const Base = styled.div`
    
`;

const Input = styled.input`
    
`;

const Button = styled.button`
    
`;

export default function Signin() {
    return (
        <Base>Signin <br/>
            <Input data-testid="email-input"></Input>
            <Input data-testid="password-input"></Input>
            <Button data-testid="signin-button">로그인</Button>
        </Base>
    )
}
