import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import SearchBar from '../components/SearchBar'

const Home = (props) => {
    // const auth = localStorage.getItem('userId')
    const [filteredWine, setFilteredWine] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // console.log(props.allWines);

    const wineList = props.allWines.slice(0).reverse().map(wine => (
        <li key = {wine.id} className = 'wine-list'>
            <Link className = 'wineLink' to = {`/wine/${wine.id}`}>{wine.name}</Link>
        </li>
    ))

    const filterWine = () => {
        const result = props.allWines.filter((wine) => {
            return wine.name.toLowerCase().includes(searchTerm)
        })
        // console.log(result);
        console.log(props.allWines);
        setFilteredWine(result)
    }
    // useEffect(() => {
    //     filterWine(searchTerm)
    // }, [searchTerm])
    useEffect(filterWine, [props.allWines, searchTerm])

    const filterList = filteredWine.slice(0).reverse().map(wine => (
        <li key ={wine.id} className = 'wine-list'>
            <Link className = 'wineLink' to = {`wine/${wine.id}`}>{wine.name}</Link>
        </li>
    ))

    return (
        <div>
            <h1>Wine Talk</h1>
            <div className = 'searchBarArea'>
                <h3>Search for Your Next Wine!</h3>
                <SearchBar searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
            </div>
            <div className = 'wineContainer'>
                <div>
                    {searchTerm ?
                    <div className = 'wineListContainer'>
                        {filterList}
                    </div> 
                    :
                    <div className = 'wineListContainer'>
                        {wineList}
                    </div>
                    
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;