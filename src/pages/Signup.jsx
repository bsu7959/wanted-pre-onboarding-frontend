import React, { useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { signUp } from '../api.js'
import { useNavigate } from 'react-router-dom';

const Base = styled.div`
    
`;

const InputContainser = styled.div`
    
`

const Input = styled.input`
    
`;

const Button = styled.button`
    
`;



export default function Signup() {
    const navigate = useNavigate();
    // 회원가입 화면 진입시 JWT가 있으면 todo로 이동합니다
    useEffect(() => {
        if (window.localStorage.getItem('JWT')) {
            navigate('/todo')
        }
    }, [])

    const emailInput = useRef();
    const passwordInput = useRef();
    const signupButton = useRef();

    const [disable, setDisable] = useState(false);

    const onClick = async (e) => {


        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        const res = await signUp({
            'email': email,
            'password': password
        })
        if(res) {
            navigate('/signin');
        }else {
            alert('회원가입 실패')
        }
        

    }
    // 키입력시 이메일과 비밀면호를 정규식을 이용해 검증하고 회원가입 버튼을 활성화/비활성화 합니다
    const onChange = (e) => {
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        const emailExptext = /@/;
        const passwordExptext = /.{8,}/;

        if (emailExptext.test(email) == false) {
            setDisable(true);
            return false;
        }

        if (passwordExptext.test(password) == false) {
            setDisable(true);
            return false;
        }

        setDisable(false);
    }

    // JWT가 있으면 렌더링하지않습니다.
    return <>{window.localStorage.getItem('JWT') ? '' :
        <Base>Signup <br />
            <InputContainser>이메일 : <Input data-testid="email-input" ref={emailInput} onChange={e => onChange(e)}></Input></InputContainser>
            <InputContainser>비밀번호 : <Input data-testid="password-input" ref={passwordInput} onChange={e => onChange(e)}></Input></InputContainser>
            <Button data-testid="signup-button" ref={signupButton} onClick={e => onClick(e)} disabled={disable}>회원가입</Button>
        </Base>}
    </>
}
