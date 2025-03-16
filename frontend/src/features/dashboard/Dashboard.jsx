import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import { collection, getDocs, deleteDoc, doc, query, orderBy, limit } from 'firebase/firestore';

const Dashboard = ({user}) => {
    const navigate = useNavigate();
    const [recentTrips, setRecentTrips] = useState([]);

    const fetchTrips = async() => {
        const tripsQuery = query(
            collection(db, 'trips'),
            orderBy('createdAt', 'desc'),
            limit(3)
        );
        
        const querySnapshot = await getDocs(tripsQuery);
        const recentTrips = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setRecentTrips(recentTrips);
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleLogout = () => {
        signOut(auth).catch((error) => {
            console.error("Logout failed:", error.message);
        });
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="welcome-container">
                    <h1>Adventure Awaits, {user.displayName}!</h1>
                    <p className="welcome-subtitle">Where will your next journey take you?</p>
                </div>
                <button 
                    onClick={() => navigate("/new-trip")}
                    className="primary-cta"
                >
                    <span className="icon">✈️</span>
                    Start New Adventure
                </button>
            </header>

            <main className="dashboard-content">
                <section className="recent-trips-section">
                    <div className="section-header">
                        <h2>Your Recent Adventures</h2>
                        <button 
                            onClick={() => navigate("/trips")}
                            className="secondary-button"
                        >
                            View All Trips
                        </button>
                    </div>
                    
                    {recentTrips.length > 0 ? (
                        <div className="trips-grid">
                            {recentTrips.map(trip => (
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
                </section>
            </main>

            <footer className="dashboard-footer">
                <button 
                    onClick={handleLogout}
                    className="logout-button"
                >
                    <span className="icon">👋</span>
                    Logout
                </button>
            </footer>
        </div>
    );
};

export default Dashboard;