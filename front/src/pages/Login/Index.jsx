import React from 'react'
import Form from './Form'
import { Redirect } from 'react-router-dom'

function Login({ onLogin, errors, userLogged }) {

    if (userLogged) { return <Redirect push to='/' /> } else {
        return <Form onSubmit={onLogin} errors={errors} />
    }

}

export default Login
