import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './searchBar.scss'

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        search && navigate(`/search?q=${search}`);
        setSearch("");
    }

    return (
        <div className="searchBar">
            <div className="searchBox">
                <input className="searchInput" type="text" name="search" placeholder="Tìm kiếm" value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className="searchButton" onClick={handleSearch}>
                    <i className="fa fa-search search-icon" />
                </button>
            </div>



        </div>
    );
}

export default SearchBar;