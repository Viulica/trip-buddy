import React, { useEffect, useState } from 'react';
import TripQRCode from '../trips/TripQRCode';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import '../../styles/AllTrips.css';

const AllTrips = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    const fetchTrips = async() => {
        const trips = await getDocs(collection(db, 'trips'));
        const tripList = trips.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setTrips(tripList);
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleDeleteTrip = async (tripId) => {
        try {
            await deleteDoc(doc(db, 'trips', tripId));
            setTrips(trips.filter((trip) => trip.id !== tripId));
        } catch (error) {
            console.error("Error deleting trip:", error);
            alert("Failed to delete trip");
        }
    };

    return (
        <div className="all-trips">
            <header className="trips-header">
                <div className="header-content">
                    <h1>Your Adventures</h1>
                    <p className="subtitle">All your journeys in one place</p>
                </div>
            </header>

            <main className="trips-content">
                {trips.length > 0 ? (
                    <div className="trips-grid">
                        {trips.map((trip) => (
                            <div key={trip.id} className="trip-card">
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
                                <div className="qr-compact">
                                    <TripQRCode tripId={trip.id} />
                                </div>
                                <div className="card-actions">
                                    <button 
                                        onClick={() => navigate(`/trips/${trip.id}`)}
                                        className="view-button"
                                    >
                                        <span className="button-icon">👁️</span>
                                        View
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteTrip(trip.id)}
                                        className="delete-button"
                                    >
                                        <span className="button-icon">🗑️</span>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No adventures yet. Time to start exploring!</p>
                        <button 
                            onClick={() => navigate("/new-trip")}
                            className="primary-cta"
                        >
                            Create Your First Trip
                        </button>
                    </div>
                )}
            </main>

            <footer className="trips-footer">
                <button 
                    onClick={() => navigate("/")}
                    className="back-button"
                >
                    Back to Dashboard
                </button>
            </footer>
        </div>
    );
};

export default AllTrips;