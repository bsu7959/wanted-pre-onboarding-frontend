import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { CreateTodo, GetTodos, UpdateTodo } from '../api.js'

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
    const todoRef = useRef([]);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        console.log('todo 첫실행')
        window.history.pushState(null, null, 'todo')
        getTodo()
    }, [])

    const onClick = (e) => {
        console.log(e)
    }

    const onCheck = async (e) => {
        todos[e.target.dataset.idx].isCompleted = e.target.checked;
        setTodos(todos);
        console.log(e.target.nextElementSibling.innerText)
        const res = await UpdateTodo({
            "id": todos[e.target.dataset.idx].id,
            "todo":e.target.nextElementSibling.innerText,
            "isCompleted":e.target.checked
        })
        if(res) {
            getTodo();
        }

    }

    const getTodo = async () => {
        const data = await GetTodos();
        setTodos(data);
    }

    const addClick = async () => {
        const data = {
            "id": 1,
            "todo" : newTodo.current.value,
            "isCompleted": false,
            "userId": props.userId
        }
        const res = await CreateTodo(data)
        if(res) {
            getTodo()
        }
    }

    const todoList = () => {
        if(todos != undefined) {
            return todos.map((el, index) => <Li ref={elem => todoRef.current[index] = elem}>
            <Label>
                <Checkbox type={'checkbox'} data-idx={index} checked={el.isCompleted} onClick={(e) => onCheck(e)}/>
                <TodoName>{el.todo}</TodoName>
                <ModifyInput data-testid='modify-input' type={'text'} />
            </Label>
            <Button data-testid="modify-button" onClick={(e) => onClick(e)}>수정</Button>
            <SubmitButton data-testid="submit-button">제출</SubmitButton>
            <Button data-testid="delete-button">삭제</Button>
            <CancelButton data-testid="cancel-button">취소</CancelButton>
        </Li>)
        }

    }

    return <>
        {window.localStorage.getItem('JWT') ?
            <Base>
                <NewTodo data-testid="new-todo-input" ref={newTodo}></NewTodo>
                <NewTodoBtn data-testid="new-todo-add-button" onClick={() => addClick()}>추가</NewTodoBtn>
                {todoList()}
            </Base>
            : ''}
    </>

}
