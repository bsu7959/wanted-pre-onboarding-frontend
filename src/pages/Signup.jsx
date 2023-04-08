import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { signUp } from '../api.js'

const Base = styled.div`
    
`;

const InputContainser = styled.div`
    
`

const Input = styled.input`
    
`;

const Button = styled.button`
    
`;



export default function Signup() {
    const emailInput = useRef();
    const passwordInput = useRef();
    const signupButton = useRef();

    const [disable, setDisable] = useState(false);

    const onClick = (e) => {

        console.log('회원가입 버튼 클릭');

        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        signUp({
            'email' : email,
            'password' : password
        })


        }

        const onChange = (e) => {
            console.log('키 입력');
            const email = emailInput.current.value;
            const password = passwordInput.current.value;

            const emailExptext = /@/;
            const passwordExptext = /.{8,}/;

            if (emailExptext.test(email) == false) {

                //alert("이메일형식이 올바르지 않습니다.");

                //emailInput.current.focus();
                setDisable(true);
                return false;
            }

            if (passwordExptext.test(password) == false) {

                //alert("비밀번호는 8자 이상이어야 합니다.");

                //passwordInput.current.focus();
                setDisable(true);
                return false;
            }

            setDisable(false);
        }

        return (
            <Base>Signup <br />
                <InputContainser>이메일 : <Input data-testid="email-input" ref={emailInput} onChange={e => onChange(e)}></Input></InputContainser>
                <InputContainser>비밀번호 : <Input data-testid="password-input" ref={passwordInput} onChange={e => onChange(e)}></Input></InputContainser>
                <Button data-testid="signup-button" ref={signupButton} onClick={e => onClick(e)} disabled={disable}>회원가입</Button>
            </Base>
        )
    }
