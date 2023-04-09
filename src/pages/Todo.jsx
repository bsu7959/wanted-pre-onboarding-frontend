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
    display: none;
`

const SubmitButton = styled.button`
    display: none;
`

const CancelButton = styled.button`
    display: none;
`


export default function Todo(props) {
    const newTodo = useRef();
    const todoRef = useRef([]);
    const [todos, setTodos] = useState([]);
    const modifying = [];
    const modifyInputRef = useRef([]);
    const modifyRef = useRef([]);
    const deleteRef = useRef([]);
    const submitRef = useRef([]);
    const cancelRef = useRef([]);

    useEffect(() => {
        console.log('todo 첫실행')
        window.history.pushState(null, null, 'todo')
        getTodo()
    }, [])

    const onModifyClick = (e) => {
        const idx = e.target.dataset.idx;
        todoRef.current[idx].style.display = "none";
        modifyRef.current[idx].style.display = "none";
        deleteRef.current[idx].style.display = "none";
        submitRef.current[idx].style.display = "inline-block";
        cancelRef.current[idx].style.display = "inline-block";
        modifyInputRef.current[idx].style.display = "inline-block";
        modifyInputRef.current[idx].value = todoRef.current[idx].innerText;
    }

    const onCancelClick = (e) => {
        const idx = e.target.dataset.idx;
        todoRef.current[idx].style.display = "inline-block";
        modifyRef.current[idx].style.display = "inline-block";
        deleteRef.current[idx].style.display = "inline-block";
        submitRef.current[idx].style.display = "none";
        cancelRef.current[idx].style.display = "none";
        modifyInputRef.current[idx].style.display = "none";
    }

    const onSubmitClick = async (e) => {
        const idx = e.target.dataset.idx;
        todoRef.current[idx].innerText = modifyInputRef.current[idx].value;
        todoRef.current[idx].style.display = "inline-block";
        modifyRef.current[idx].style.display = "inline-block";
        deleteRef.current[idx].style.display = "inline-block";
        submitRef.current[idx].style.display = "none";
        cancelRef.current[idx].style.display = "none";
        modifyInputRef.current[idx].style.display = "none";
        
        todos[idx].todo = modifyInputRef.current[idx].value;
        setTodos(todos);
        const res = await UpdateTodo({
            "id": todos[idx].id,
            "todo":todos[idx].todo,
            "isCompleted":todos[idx].isCompleted
        })
        if(res) {
            getTodo();
        }
    }

    // 체크박스 클릭시 api.js의 UpdateTodo로 값을 업데이트 후 getTodo함수를 통해 새로운 데이터를 불러옴
    const onCheck = async (e) => {
        todos[e.target.dataset.idx].isCompleted = e.target.checked;
        setTodos(todos);
        const res = await UpdateTodo({
            "id": todos[e.target.dataset.idx].id,
            "todo":e.target.nextElementSibling.innerText,
            "isCompleted":e.target.checked
        })
        if(res) {
            getTodo();
        }

    }
    // todo리스트를 받아오는 함수 api.js의 GetTodos를 비동기로 받아와 setState함
    const getTodo = async () => {
        const data = await GetTodos();
        setTodos(data);

    }

    // todo 추가버튼 클릭시 함수
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

    // 반복요소인 todo 리스트 요소 생성 함수
    const todoList = () => {
        if(todos != undefined) {
            return todos.map((el, index) => <Li >
            <Label>
                <Checkbox type={'checkbox'} data-idx={index} checked={el.isCompleted} onClick={(e) => onCheck(e)}/>
                <TodoName ref={elem => todoRef.current[index] = elem}>{el.todo}</TodoName>
                <ModifyInput data-testid='modify-input' data-idx={index} ref={elem => modifyInputRef.current[index] = elem} type={'text'} />
            </Label>
            <Button data-testid="modify-button" data-idx={index} ref={elem => modifyRef.current[index] = elem} onClick={(e) => onModifyClick(e)}>수정</Button>
            <Button data-testid="delete-button" data-idx={index} ref={elem => deleteRef.current[index] = elem}>삭제</Button>
            <SubmitButton data-testid="submit-button" data-idx={index} ref={elem => submitRef.current[index] = elem} onClick={(e) => onSubmitClick(e)}>제출</SubmitButton>
            <CancelButton data-testid="cancel-button" data-idx={index} ref={elem => cancelRef.current[index] = elem} onClick={(e) => onCancelClick(e)}>취소</CancelButton>
        </Li>)
        }

    }
    // 토큰이 없을 시 렌더링 하지않음
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
