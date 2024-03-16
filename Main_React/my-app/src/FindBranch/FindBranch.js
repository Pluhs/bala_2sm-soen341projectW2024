import React from 'react';
import "./FindBranch.css"
import { useState } from 'react';


function Branch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [branches, setBranches] = useState([]);


    const handleSearch = async (e) => {
        e.preventDefault();
        const fetchedBranches = await fetchBranches(searchTerm);
        setBranches(fetchedBranches);
    };
    const fetchBranches = async (searchTerm) => {
        return [
            { id: 1, name: "Branch 1", address: "123 Main St" },
            { id: 2, name: "Branch 2", address: "456 Broadway" },
        ].filter(branch => branch.address.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    return (
        <div className="branchFinder">
            <form onSubmit={handleSearch} className="searchForm">
                <div className="searchInputWrapper">
                    <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                    <input
                        type="text"
                        className="searchInput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter zip code or city"
                    />
                </div>
                <button type="submit" className="searchButton">Search</button>
            </form>
            <ul className="branchList">
                {branches.map(branch => (
                    <li key={branch.id} className="branchItem">{branch.name} - {branch.address}</li>
                ))}
            </ul>
        </div>


    );
}

export default Branch;

