import React, { useState } from 'react';
import "./FindBranch.css";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function Branch(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [branches, setBranches] = useState([]);

    const bran = [
        { id: 1, name: "Branch 1", address: "123 Main St", lat: 37.7749, lng: -122.4194 },
        { id: 2, name: "Branch 2", address: "456 Broadway", lat: 40.7128, lng: -74.0060 },
    ].filter(branch => branch.address.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSearch = async (e) => {
        e.preventDefault();
        // const fetchedBranches = await fetchBranches(searchTerm);
        setBranches(bran);
    };

    // const fetchBranches = async (searchTerm) => {
    //     return [
    //         { id: 1, name: "Branch 1", address: "123 Main St", lat: 37.7749, lng: -122.4194 },
    //         { id: 2, name: "Branch 2", address: "456 Broadway", lat: 40.7128, lng: -74.0060 },
    //     ].filter(branch => branch.address.toLowerCase().includes(searchTerm.toLowerCase()));
    // };

    const mapStyles = {
        width: '50%',
        height: '100%',
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
            <div style={{display: 'flex', flexDirection: 'row'}}>

                <Map
                    google={props.google}
                    zoom={12}
                    style={mapStyles}
                    initialCenter={{lat: 45.5019, lng: -73.5674}}
                >
                    {bran.map(branch => (
                        <Marker key={branch.id} position={{lat: branch.lat, lng: branch.lng}}/>
                    ))}
                    <Marker
                        position={{ lat: 45.5019, lng: -73.5674 }}
                        title="Default Location"
                    />
                </Map>
            </div>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB-6hJsNEB1YOAfsE8CaTqUJvxGE57wYjM'
})(Branch);