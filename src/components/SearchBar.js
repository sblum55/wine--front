const SearchBar = (props) => {
    // console.log(props);
    return (
        <div>
        <input className = 'searchBar' placeholder = 'Red Wine' value = {props.searchTerm} onChange = {(e) => {props.setSearchTerm(e.target.value)}} />
        </div>
    )
}
export default SearchBar;