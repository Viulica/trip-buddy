import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import TripForm from './TripForm';
import { GOOGLE_MAPS_API_KEY } from '../../services/googleMaps';
import '../../styles/NewTrip.css';

const NewTrip = () => {
    const [tripDetails, setTripDetails] = useState({
        location: '',
        activity: '',
        isCreated: false
    });
    
    const [markerPosition, setMarkerPosition] = useState({ 
        lat: 37.7749, 
        lng: -122.4194 
    });

    const navigate = useNavigate();

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAllTrips = () => {
        navigate("/trips");
    };

    if (loadError) return <div className="error-message">Error loading maps</div>;
    if (!isLoaded) return <div className="loading-message">Loading maps...</div>;

    return (
        <div className="new-trip-container">
            <div className="new-trip-header">
                <h1>Plan Your Adventure</h1>
                <p className="subtitle">Create a new trip and share it with friends</p>
            </div>
            
            <div className="new-trip-content">
                <div className="form-panel">
                    <TripForm 
                        tripDetails={tripDetails} 
                        setTripDetails={setTripDetails}
                        setMarkerPosition={setMarkerPosition}
                    />
                </div>
                
                <div className="map-panel">
                    <div className="map-container">
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            zoom={10}
                            center={markerPosition}
                            onClick={(e) => setMarkerPosition({ 
                                lat: e.latLng.lat(), 
                                lng: e.latLng.lng() 
                            })}
                        >
                            <Marker position={markerPosition} />
                        </GoogleMap>
                    </div>
                    {!tripDetails.isCreated && (
                        <div className="map-instructions">
                            <p>
                                <span className="instruction-icon">📍</span> 
                                Click on the map to set a location or use the search box
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="navigation-buttons">
                <button onClick={handleGoBack} className="secondary-button">Go back</button>
                <button onClick={handleAllTrips} className="secondary-button">View all trips</button>
            </div>
        </div>
    );
};

export default NewTrip;
