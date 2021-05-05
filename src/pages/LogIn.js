import axios from 'axios'
import { useState } from 'react'

const LogInForm = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {email, password})
        .then((response) => {
            console.log(response);
            props.setUser(response.data.user)
            localStorage.setItem('userId', response.data.encryptedId)
            props.fetchUser()
        })
    }

    return (
        <div className = 'loginFormArea'>
            <div>
                <h1>Login to Get Started!</h1>
            </div>
            <form onSubmit = {handleSubmit}>
                <div>
                    <div>
                    <label htmlFor = 'new-email'>Email</label>
                    </div>
                    <input className = 'loginInput' id = 'new-email' value = {email} onChange = {(e) => {setEmail(e.target.value)}} />
                </div>
                <div>
                    <div>
                    <label htmlFor = 'new-password'>Password</label>
                    </div>
                    <input className = 'loginInput' type = 'password' id = 'new-password' value = {password} onChange = {(e) => {setPassword(e.target.value)}} />
                </div>
                <div>
                    <input type = 'submit' value = 'SUBMIT' />
                </div>
            </form>
        </div>
    )
}

export default LogInForm;