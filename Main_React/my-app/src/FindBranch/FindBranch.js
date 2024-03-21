import React, { useEffect, useState } from 'react';
import "./FindBranch.css";
import { Map, GoogleApiWrapper, Marker, DirectionsRenderer } from 'google-maps-react';
import { fetchAllBranches } from "./BranchInfo";
import { Link } from 'react-router-dom';

function FindBranch(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [branches, setBranches] = useState([]);
    const [allBranches, setAllBranches] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = React.useRef(null);
    const directionsRendererRef = React.useRef(null);


    useEffect(() => {
        const fetchBranches = async () => {
            const fetchedBranches = await fetchAllBranches();
            console.log("Fetched Branches: ", fetchedBranches);
            setAllBranches(fetchedBranches);
        };
        fetchBranches();
    }, []);

    const handleSearch = async (e) => {

        e.preventDefault();
        setSearchPerformed(true);

        const geocoder = new props.google.maps.Geocoder();
        geocoder.geocode({ address: searchTerm }, (results, status) => {
            if (status === "OK") {
                const location = results[0].geometry.location;
                setUserLocation(location);
                const destinations = allBranches.map(branch => new props.google.maps.LatLng(branch.lat, branch.lng));

                const distanceMatrixService = new props.google.maps.DistanceMatrixService();
                distanceMatrixService.getDistanceMatrix({
                    origins: [location],
                    destinations: destinations,
                    travelMode: 'DRIVING',
                }, (response, status) => {
                    if (status === 'OK') {
                        const distances = response.rows[0].elements;
                        const branchesWithDistance = allBranches.map((branch, index) => ({
                            ...branch,
                            distance: distances[index].distance.text,
                            duration: distances[index].duration.text
                        }));

                        const sortedBranches = branchesWithDistance.sort((a, b) => parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]));
                        setBranches(sortedBranches);
                    }
                });
            } else {
                console.error("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    const displayRoute = (branch) => {
        if (!userLocation || !mapRef.current) {
            console.error("User location or map instance is not set.");
            return;
        }

        // Initialize or clear DirectionsRenderer
        if (!directionsRendererRef.current) {
            directionsRendererRef.current = new props.google.maps.DirectionsRenderer();
            directionsRendererRef.current.setMap(mapRef.current.map); // Adjust based on your map instance
        } else {
            // Clear previous directions
            directionsRendererRef.current.setDirections(null);
        }

        const branchLocation = new props.google.maps.LatLng(branch.lat, branch.lng);
        const directionsService = new props.google.maps.DirectionsService();

        const request = {
            origin: userLocation,
            destination: branchLocation,
            travelMode: 'DRIVING',
        };

        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRendererRef.current.setDirections(result);
            } else {
                console.error('Failed to display route: ' + status);
            }
        });
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
                            <i className="fa fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>
                {(searchPerformed && branches.length > 0) && (
                    <div className="branchResults">
                        <ul className="branchList">
                            {branches.map(branch => (
                                <li key={branch.id} className="branchItem" onClick={() => displayRoute(branch)}>
                                    <div className="branchListContainer">
                                        <div>
                                            <Link to={`/branch/${branch.id}`} className="branchIconLink">
                                                <button className="searchButton">
                                                    <i className="fa fa-info"></i>
                                                </button>
                                            </Link>
                                        </div>
                                        <div>
                                            {branch.name} - {branch.address} (Distance: {branch.distance})
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
                    style={{ width: '100%', height: '100%' }}
                    initialCenter={{ lat: 45.5019, lng: -73.5674 }}
                    ref={mapRef}
                >
                    {allBranches.map(branch => (
                        <Marker key={branch.id} position={{ lat: branch.lat, lng: branch.lng }} />
                    ))}
                </Map>
            </div>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB-6hJsNEB1YOAfsE8CaTqUJvxGE57wYjM' // Replace 'YOUR_API_KEY' with your actual Google Maps API key
})(FindBranch);
