import React, {useRef,useEffect, useState } from 'react';
import "./FindBranch.css";
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react';
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
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const showInfoWindow = useState(true)[0];
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const [place, setPlace]= useState(null);
    
    useEffect(() => {
        const fetchBranches = async () => {
            const fetchedBranches = await fetchAllBranches();
            console.log("Fetched Branches: ", fetchedBranches);
            setAllBranches(fetchedBranches);
        };
        fetchBranches();
        const options = {
            componentRestrictions: { country: ["ca","us"] },
            fields: ["address_components", "geometry", "name"],
            types:["address"]
          };
          
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current,options);
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();//gets a place object which contain the location of the searched address
            setPlace(place)
            setSearchTerm(place.formatted_adress)//sets the content of the input box to the address of the place
            
           });
    }, []);

    const handleSearch = async (e) => {

        e.preventDefault();
        setSearchPerformed(true);

        if(place==null||place==undefined){//if user submits form without selecting an address
            return;
        }
        

                    var location=place.geometry.location;
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
                            ref={inputRef}
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
                        <Marker key={branch.id} position={{ lat: branch.lat, lng: branch.lng }} onClick={(props, marker) => {
                            setSelectedBranch(branch);
                            setActiveMarker(marker);
                          }}/>
                    ))}
                     {selectedBranch ? (
                        <InfoWindow
                            visible={showInfoWindow}
                            marker={activeMarker}
                            onCloseClick={() => {
                            setSelectedBranch(null);
                            }}
                        >
                            <div>
                                <a href={`/branch/${selectedBranch.id}`} >
                                    <button className="searchButton">
                                        <i className="fa fa-info"></i>
                                    </button>
                                </a>
                                
                                <h2 style={{display:'inline'}}> {selectedBranch.name}</h2>
                                <p>{selectedBranch.address}</p>
                                
                                            
                            </div>
                            
                        </InfoWindow>
                        ) : null}
                </Map>
            </div>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB-6hJsNEB1YOAfsE8CaTqUJvxGE57wYjM' 
})(FindBranch);
