import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { CreateTodo } from '../api.js'

const Base = styled.div`
    
`;

const NewTodo = styled.input`
    
`

const NewTodoBtn = styled.button`
    
`

const Li = styled.li`
    
`

const Label = styled.label`
    
`

const Checkbox = styled.input`
    
`

const TodoName = styled.span`
    
`

const Button = styled.button`
    
`

const ModifyInput = styled.input`
    
`

const SubmitButton = styled.button``

const CancelButton = styled.button`
    
`


export default function Todo(props) {
    const newTodo = useRef();

    useEffect(() => {
        console.log('todo 첫실행')
        window.history.pushState(null, null, 'todo')
    }, [])

    const onClick = (e) => {
        console.log(e.target.dataset)
    }

    const addClick = async () => {
        const data = {
            "id": 1,
            "todo" : newTodo.current.value,
            "isCompleted": false,
            "userId": props.userId
        }
        
        const res = await CreateTodo(data)
    }

    return <>
        {window.localStorage.getItem('JWT') ?
            <Base>
                <NewTodo data-testid="new-todo-input" ref={newTodo}></NewTodo>
                <NewTodoBtn data-testid="new-todo-add-button" onClick={() => addClick()}>추가</NewTodoBtn>
                <Li>
                    <Label>
                        <Checkbox type={'checkbox'} />
                        <TodoName>TODO 1</TodoName>
                        <ModifyInput data-testid='modify-input' type={'text'} />
                    </Label>
                    <Button data-testid="modify-button" onClick={(e) => onClick(e)}>수정</Button>
                    <SubmitButton data-testid="submit-button">제출</SubmitButton>
                    <Button data-testid="delete-button">삭제</Button>
                    <CancelButton data-testid="cancel-button">취소</CancelButton>
                </Li>
            </Base>
            : ''}
    </>

}
