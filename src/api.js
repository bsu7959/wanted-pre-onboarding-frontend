import axios from 'axios';


const API_END_POINT = 'https://www.pre-onboarding-selection-task.shop';

// 회원가입
export async function signUp(req) {
    let res = false;
    const data = {
        email: req.email,
        password: req.password
    }
    await axios.post(`${API_END_POINT}/auth/signup`, JSON.stringify(data),
        {
            headers: {
                'Content-type': 'application/json',
            },
        }).then(response => res = true)
        .catch(error => res = false)
    return res;
    // bsu123@123 12312312
}

// 로그인 -- 로그인시 JWT를 받아오지만 userid는 받아오지않아 email로 대체해서 사용했습니다
export async function signIn(req) {
    const data = {
        email: req.email,
        password: req.password
    }
    let res = false;
    await axios.post(`${API_END_POINT}/auth/signin`, JSON.stringify(data),
        {
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then((response) => {
            window.localStorage.setItem('JWT', response.data.access_token);
            res = true;
        })
        .catch((error) => {res = false;});
        return res;
}

// todo 추가
export async function CreateTodo(req) {
    const data = {
        "id" : req.id,
        "todo" : req.todo,
        "isCompleted" : req.isCompleted,
        "userId" : req.userId
    }

    let res = '';
    await axios.post(`${API_END_POINT}/todos`, JSON.stringify(data),
        {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`,
                'Content-type': 'application/json',
            },
        })
        .then((response) => {
            res = true;
        })
        .catch((error) => {res = false;});
        return res;
}

// todo 불러오기
export async function GetTodos() {
    let res = '';
    await axios.get(`${API_END_POINT}/todos`, {
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
        },
    })
    .then((response) => {
        res = response.data
    })
    return res;
}

// todo 수정
export async function UpdateTodo(req) {
    const data = {
        "todo": req.todo,
        "isCompleted": req.isCompleted
    }
    let res = false;
    await axios.put(`${API_END_POINT}/todos/${req.id}`, JSON.stringify(data),{
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`,
            'Content-type': 'application/json'
        },
    })
    .then((response) => {
        res = true
    })
    .catch((error) => {
        res = false;
    })
    return res;
}

// todo 삭제
export async function DeleteTodo(req) {
    let res = false;
    await axios.delete(`${API_END_POINT}/todos/${req}`, {
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
        }
    })
    .then((response) => {
        res = true;
    })
    .catch((error) => {
        res = false;
    })
    return res;
}

