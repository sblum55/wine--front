import axios from 'axios'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'

const AddComment = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [redirect, setRedirect] = useState(null)

    const auth = localStorage.getItem('userId')

    const handleSubmit = () => {
        // e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/wines/allwines/${props.postId}/comments`, {
            title,
            description
        }, {
            headers: {
                Authorization: auth
            }
        })
        .then((response) => {
            console.log(response);
            setRedirect(`/wine/${props.postId}`)
            setTitle('')
            setDescription('')
            props.fetchAllComments()
        })
    }

    return (
        <div>
            <h2>Submit Your Thoughts here!</h2>
            <div className = 'commentContainer'>
                {redirect && <Redirect to = {redirect} />}
                <form onSubmit = {handleSubmit}>
                    <label className = 'commentLabel' htmlFor = 'new-title'>Title: </label>
                    <input className = 'commentInput' value = {title} onChange = {(e) => {setTitle(e.target.value)}} />
                    <label className = 'commentLabel' htmlFor = 'new-description'>Comment: </label>
                    <input className = 'commentInput' value = {description} onChange = {(e) => {setDescription(e.target.value)}} />
                    <input className = 'commentBtn' type = 'submit' />
                </form>
            </div>
        </div>
    )
}

export default AddComment;