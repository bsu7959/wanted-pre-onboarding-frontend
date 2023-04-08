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
            console.log('로그인성공');
            window.localStorage.setItem('JWT', response.data.access_token);
            res = true;
        })
        .catch((error) => {res = false;});
        return res;
    // bsu123@123 12312312

}

