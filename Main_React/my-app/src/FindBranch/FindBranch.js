import React, {useEffect, useState} from 'react';
import "./FindBranch.css";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';import {fetchAllBranches} from "./BranchInfo";
import {Link} from 'react-router-dom';


function Branch(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [branches, setBranches] = useState([]);
    const [allBranches, setAllBranches] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        const fetchBranches = async () => {
            const fetchedBranches = await fetchAllBranches();
            console.log("Fetched Branches: ", fetchedBranches);
            setAllBranches(fetchedBranches);
            // setBranches(fetchedBranches);
        };
        fetchBranches();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchPerformed(true);
        if (!searchTerm.trim()) {
            setBranches(allBranches);
        } else {
            const filteredBranches = allBranches.filter(branch =>
                branch.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setBranches(filteredBranches);
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <form onSubmit={handleSearch} className="searchForm">
                    <div className="searchInputWrapper">
                        <input
                            type="text"
                            className="searchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter your address..."
                        />
                        <button type="submit" className="searchButton">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>
                {(searchPerformed && branches.length > 0) && (
                    <div className="branchResults">
                        <ul className="branchList">
                            {branches.map(branch => (
                                <li key={branch.id} className="branchItem">
                                    <div className="branchListContainer">
                                        <div>
                                            <Link to={`/branch/${branch.id}`} className="branchIconLink">
                                                <button type="submit" className="searchButton">
                                                    <i className="fa-solid fa-info"></i>
                                                </button>
                                            </Link>
                                        </div>
                                        <div>
                                            {branch.name} - {branch.address}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="mapContainer">
                <Map
                    google={props.google}
                    zoom={12}
                    style={{width: '100%', height: '100%'}}
                    initialCenter={{lat: 45.5019, lng: -73.5674}}
                >
                    {allBranches.map(branch => (
                        <Marker key={branch.id} position={{lat: branch.lat, lng: branch.lng}}/>
                    ))}
                </Map>
            </div>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB-6hJsNEB1YOAfsE8CaTqUJvxGE57wYjM'
})(Branch);
