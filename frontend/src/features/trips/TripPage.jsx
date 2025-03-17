import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import TripQRCode from './TripQRCode';
import '../../styles/TripPage.css';

const TripPage = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const tripDoc = await getDoc(doc(db, 'trips', tripId));
                if (tripDoc.exists()) {
                    setTrip({
                        id: tripDoc.id,
                        ...tripDoc.data()
                    });
                } else {
                    console.log("No such trip!");
                }
            } catch (error) {
                console.error("Error fetching trip:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [tripId]);

    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading trip details...</p>
        </div>
    );
    
    if (!trip) return (
        <div className="error-container">
            <h2>Trip not found</h2>
            <p>The trip you're looking for doesn't exist or has been deleted.</p>
            <button 
                onClick={() => navigate('/trips')}
                className="back-button"
            >
                Back to All Trips
            </button>
        </div>
    );

    return (
        <div className="trip-page">
            <header className="trip-page-header">
                <h1>{trip.location}</h1>
                <div className="trip-badge">{trip.activity}</div>
            </header>

            <div className="trip-page-content">
                <div className="trip-details-card">
                    <div className="trip-meta">
                        <div className="meta-item">
                            <span className="meta-icon">📅</span>
                            <div>
                                <h3>Date</h3>
                                <p>{trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : 'Not specified'}</p>
                            </div>
                        </div>
                        
                        <div className="meta-item">
                            <span className="meta-icon">🎯</span>
                            <div>
                                <h3>Activity</h3>
                                <p>{trip.activity}</p>
                            </div>
                        </div>
                    </div>

                    {trip.tripLog && trip.tripLog.trim() !== '' && (
                        <div className="trip-log-section">
                            <h2>Trip Log</h2>
                            <div className="trip-log-content">
                                {trip.tripLog.split('\n').map((paragraph, index) => (
                                    paragraph.trim() !== '' ? <p key={index}>{paragraph}</p> : <br key={index} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer className="trip-page-footer">
                <button 
                    onClick={() => navigate('/trips')}
                    className="back-button"
                >
                    Back to All Trips
                </button>
            </footer>
        </div>
    );
};

export default TripPage;
