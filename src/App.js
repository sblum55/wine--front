import './App.css';
import { Route, Redirect } from 'react-router-dom'
import { useState, useEffect} from 'react'
import axios from 'axios'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import SignUpForm from './pages/SignUp'
import LogInForm from './pages/LogIn'
import SingleWine from './pages/SingleWine'
import WineForm from './pages/CreateWine'
import EditWine from './pages/EditWine'


function App() {
  const [user, setUser] = useState({})
  const [allWines, setAllWines] = useState([])

  const fetchWine = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/wines/allwines`)
    .then((response) => {
      // console.log(response.data);
      setAllWines(response.data)
    })
  }

  useEffect(fetchWine, [])

  const fetchUser = () => {
    if (localStorage.getItem('userId')) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
        headers: {
          Authorization: localStorage.getItem('userId')
        }
      })
      .then ((response) => {
        // console.log('verify response', response);
        setUser(response.data.user)})
    }
  }
  useEffect(fetchUser, [])

  return (
    <div className="App">

      {/* NavBar */}
      <NavBar user = {user} setUser = {setUser} />

      {/* Home Page */}
      <Route exact path = '/'>
        <Home allWines = {allWines} user = {user} />
      </Route>

        {/* Sign Up Form */}
      <Route exact path = '/signup' render={() => {
        if (user.id) {
          return <Redirect to = '/'/>
        } else {
          return <SignUpForm setUser = {setUser} fetchUser = {fetchUser} />
        }
      }} />

        {/* Login Form */}
      <Route exact path = '/login' render={() => {
        if (user.id) {
          return <Redirect to = '/'/>
        } else {
          return <LogInForm setUser = {setUser} fetchUser = {fetchUser} />
        }
      }} />

      {/* Single Wine Page */}
      <Route exact path = '/wine/:id' render = {(routingInfo) => {
        return <SingleWine id = {routingInfo.match.params.id} user = {user} fetchWine = {fetchWine} />
      }} />

      {/* Wine form Page */}
      <Route exact path = '/new'>
        <WineForm user = {user} setUser = {setUser} fetchWine = {fetchWine} setAllWines = {setAllWines} />
      </Route>

      {/* Edit Wine Form */}
      <Route exact path = '/wine/:id/edit' render = {(routingInfo) => {
        return <EditWine id = {routingInfo.match.params.id} user = {user} fetchWine = {fetchWine} />
      }} />


    </div>
  );
}

export default App;
