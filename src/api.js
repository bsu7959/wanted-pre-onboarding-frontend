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
                'Content-type' : 'application/json',
            },
        }).then(response => console.log(response));
        // bsu123@123 12312312

}

