import React, { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { signIn } from '../api.js'
import { useNavigate } from 'react-router-dom';

const Base = styled.div`
    
`;

const Input = styled.input`
    
`;

const Button = styled.button`
    
`;

export default function Signin(props) {
    // 로그인화면 첫 진입시 JWT이 존재하면 todo로 이동 useNavigate사용
    useEffect(() => {
        if(window.localStorage.getItem('JWT')) {
            navigate('/todo')
        }

    }, [])
    
    const navigate = useNavigate();

    const emailInput = useRef();
    const passwordInput = useRef();

    const onClick = () => {
        navigate('/signup')
    }

    // 로그인 함수 api.js의 signIn 함수를 사용합니다
    const signinClick = async () => {
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        const res = await signIn({
            'email' : email,
            'password' : password
        })
        if(res) {
            // 로그인시 못받아온 userid 대신 email을 setState했습니다.
            props.setUserId(email)
            alert('로그인 성공')
            navigate('/todo')
        }else {
            alert('로그인 실패')
        }
    }
    // JWT가 있으면 렌더링을 하지 않습니다.
    return <>
        {window.localStorage.getItem('JWT') ? '':<Base>Signin <br/>
        <Input data-testid="email-input" ref={emailInput}></Input>
        <Input data-testid="password-input" ref={passwordInput}></Input>
        <Button data-testid="signin-button" onClick={e => signinClick()}>로그인</Button>
        <Button onClick={e => onClick()}>회원가입</Button>
    </Base>}
        
    </>
}
