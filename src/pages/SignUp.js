import axios from 'axios'
import { useState } from 'react'

const SignUpForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {name, email, password})
        .then((response) => {
            console.log('sign up response', response);
            props.setUser(response.data.user)
            localStorage.setItem('userId', response.data.user.id)
            props.fetchUser()
        })
    }

    return (
        <div>
            <h1>Join the Fun Here!!</h1>
            <form onSubmit = {handleSubmit}>
                <div className = 'nameArea'>
                    <div>
                    <label htmlFor = 'new-name'>Name </label>
                    </div>
                    <input className = 'signUpInput' id = 'new-name' value = {name} onChange = {(e) => {setName(e.target.value)}} />
                </div>
                <div className = 'emailArea'>
                    <div>
                    <label htmlFor = 'new-email'>Email </label>
                    </div>
                    <input className = 'signUpInput' id = 'new-email' value = {email} onChange = {(e) => {setEmail(e.target.value)}} />
                </div>
                <div className = 'passwordArea'>
                    <div>
                    <label htmlFor = 'new-password'>Password </label>
                    </div>
                    <input className = 'signUpInput' type = 'password' id = 'new-password' value = {password} onChange = {(e) => {setPassword(e.target.value)}} />
                </div>
                <div className = 'signUpBtnArea'>
                    <input className = 'signUpBtn' type = 'submit' value = 'SUBMIT' />
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;