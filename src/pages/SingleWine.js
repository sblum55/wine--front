import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect, useParams } from 'react-router-dom'
import AddComment from './AddComment';


const SingleWine = (props) => {
    // console.log('found props', props);
    const [wine, setWine] = useState({})
    // const [allComment, setAllComment] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState(null)
    const [comment, setComment] = useState([])
    const [isMatch, setIsMatch] = useState(false)
    const {id} = useParams()
    const auth = localStorage.getItem('userId')

    const fetchOneWine = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/wines/allwines/${props.id}`)
        .then((response) => {
            console.log(response.data.wine);
            // console.log(response.data.wine.comments);
            setWine(response.data.wine)
            setComment([...response.data.wine.comments])
            isCreator(response.data.wine.user.id)
        })
    }

    useEffect(fetchOneWine , [props.id])

    const fetchAllComments = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/wines/allwines/${props.id}/comments`)
        .then((response) => {
            console.log(response);
        })
    }

    useEffect(fetchAllComments, [props.id])

    const isCreator = async (id) => {
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        })
        console.log('is creator response', response.data.user, id);
        if (response.data.user === id) {
            setIsMatch(true)
            return true
        } else {
            return false
        }
    }

    useEffect(isCreator, [])

    return (
        <div>
            { shouldRedirect && <Redirect to = {shouldRedirect}/>}

            {isMatch &&
                    <div>
                        <button className = 'deleteWineBtn' onClick = {() => {
                            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/wines/allwines/${props.id}`, {
                                headers: {
                                    Authorization: auth
                                }
                            }).then ((response) => {
                                setShouldRedirect('/')
                                props.fetchWine()
                            })
                        }} >DELETE</button>

                        <Link to = {`/wine/${props.id}/edit`} >
                            <button className = 'editWineBtn'>EDIT</button>
                        </Link>
                    </div>
            }

            <div className = 'singleWineContainer'>
                <div>
                    <h1>{wine.name}</h1>
                    <span>{wine.type}</span>{ ' | '}
                    <span>{wine.price}</span>{ ' | '}
                    <span>{wine.purchase_location}</span>
                </div>
                    <img src = {wine.image}></img>
                    <p className = 'wineDescription' >{wine.description}</p>
            </div>

            <div className = 'commentForm'>
            <AddComment postId = {props.id} auth = {auth} fetchAllComments = {fetchAllComments} />
            </div>
            <h2 className = 'wineThoughts' >Wine Thoughts</h2>
            <div className = 'commentContainer'>
                {comment.map(comment => {
                    return (
                        <div className = 'commentSection'>
                            <h4>{comment.title}</h4>
                            <p>{comment.description}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default SingleWine;