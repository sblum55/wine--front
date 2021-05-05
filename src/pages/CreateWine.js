import axios from 'axios'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'

const WineForm = (props) => {
    // console.log(props);
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [purchase_location, setPurchase_Location] = useState('')
    const [description, setDescription] = useState('')

    const [redirect, setRedirect] = useState(null)
  
    const handleSubmit = (e) => {
        const auth = localStorage.getItem('userId')
        // console.log(auth);
        e.preventDefault()
        // console.log('called handle submit');
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/wines`, {name, type, price, image, purchase_location, description}, {
            headers: {
                Authorization: auth
            }
        })
        .then((response) => {
            console.log(response);
            props.setUser(response.data.user)
            setRedirect('/')
            props.fetchWine()
            
        })
    }

    return (
        <div>
            <h1>Tell Us About Some Wine!</h1>
            {redirect && <Redirect to = {redirect} />} 
            <form onSubmit={handleSubmit}>
                <div>
                    <div className = 'createWineLabelDiv' >
                        <label className = 'createWineLabel' htmlFor = 'new-wine-name'>Name</label>
                    </div>
                    <input className = 'createWineInput' id = 'new-wine-name' value = {name} onChange = {(e) => {setName(e.target.value)}} />
                </div>
                <div>
                    <div className = 'createWineLabelDiv'>
                        <label className = 'createWineLabel' htmlFor = 'new-wine-type'>Type</label>
                    </div>
                    <input className = 'createWineInput' id = 'new-wine-type' value = {type} onChange = {(e) => {setType(e.target.value)}} />
                </div>
                <div>
                    <div className = 'createWineLabelDiv'>
                        <label className = 'createWineLabel' htmlFor = 'new-wine-price'>Price</label>
                    </div>
                    <input className = 'createWineInput' id = 'new-wine-price' value = {price} onChange = {(e) => {setPrice(e.target.value)}} />
                </div>
                <div>
                    <div className = 'createWineLabelDiv'>
                        <label className = 'createWineLabel' htmlFor = 'new-wine-image'>Image</label>
                    </div>
                    <input className = 'createWineInput' type = 'url' id = 'new-wine-image' value = {image} onChange = {(e) => {setImage(e.target.value)}} />
                </div>
                <div>
                    <div className = 'createWineLabelDiv'>
                        <label className = 'createWineLabel' htmlFor = 'new-wine-location'>Purchase Location</label>
                    </div>
                    <input className = 'createWineInput' id = 'new-wine-location' value = {purchase_location} onChange = {(e) => {setPurchase_Location(e.target.value)}} />
                </div>
                <div>
                    <div className = 'createWineLabelDiv'>
                        <label className = 'createWineLabel' htmlFor = 'new-wine-description'>Description</label>
                    </div>
                    <textarea className = 'createWineInput' id = 'new-wine-description' value = {description} onChange = {(e) => {setDescription(e.target.value)}} />
                </div>
                <input className = 'createWineSubmit' type = 'submit' value = 'ADD WINE' />
            </form>
        </div>
    )
}

export default WineForm;