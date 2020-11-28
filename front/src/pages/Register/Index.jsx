import React from 'react'
import Form from './Form'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

function Register({ userLogged }) {

    let history = useHistory();
    userLogged && history.push('/admin');

    const onSubmit = async (event) => {
        const { name, email, password } = event.target.elements;
        const data = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        try {
            const headers = {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
            await axios.post('http://localhost:3000/api/user/register', data, {
                headers: headers
            })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            alert(error);
        }
    }
    return <Form onSubmit={onSubmit} />
}
export default Register
