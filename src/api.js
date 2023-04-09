import axios from 'axios';


const API_END_POINT = 'https://www.pre-onboarding-selection-task.shop';

export async function signUp(req) {

    console.log(req)
    const data = {
        email: req.email,
        password: req.password
    }
    await axios.post(`${API_END_POINT}/auth/signup`, JSON.stringify(data),
        {
            headers: {
                'Content-type': 'application/json',
            },
        }).then(response => console.log(response));
    // bsu123@123 12312312
}

export async function signIn(req) {
    console.log(req)
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
            console.log(response.data)
            console.log('로그인성공');
            window.localStorage.setItem('JWT', response.data.access_token);
            res = true;
        })
        .catch((error) => {res = false;});
        return res;
}

export async function CreateTodo(req) {
    const data = {
        "id" : req.id,
        "todo" : req.todo,
        "isCompleted" : req.isCompleted,
        "userId" : req.userId
    }
    console.log(data)

    let res = '';
    await axios.post(`${API_END_POINT}/todos`, JSON.stringify(data),
        {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`,
                'Content-type': 'application/json',
            },
        })
        .then((response) => {
            console.log('todo추가 성공');
            res = true;
        })
        .catch((error) => {res = false;});
        return res;
}

export async function GetTodos() {
    let res = '';
    await axios.get(`${API_END_POINT}/todos`, {
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
        },
    })
    .then((response) => {
        console.log(response.data)
        res = response.data
    })
    return res;
}

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
        console.log(response)
        res = true
    })
    return res;
}

