import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'

const TripCard = ({ trip }) => {
    const navigate = useNavigate();
    
    return (
        <div className="trip-card">
            <div className="trip-header">
                <div className="location-badge">{trip.activity}</div>
                <h3>{trip.location}</h3>
                {trip.createdAt && (
                    <p className="trip-date">
                        <span className="date-icon">📅</span> 
                        {new Date(trip.createdAt).toLocaleDateString()}
                    </p>
                )}
            </div>
            <div className="trip-actions">
                <button 
                    onClick={() => navigate(`/trips/${trip.id}`)}
                    className="view-details-button"
                >
                    <span className="button-icon">👁️</span>
                    View Details
                </button>
            </div>
        </div>
    );
};

export default TripCard;