import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import TripQRCode from './TripQRCode';
import ActivityDropdown from '../../components/ActivityDropdown';
import '../../styles/TripForm.css';
import Image from '../../components/image';

const TripForm = ({tripDetails, setTripDetails, setMarkerPosition}) => {

  const [selectedActivity, setSelectedActivity] = useState('Select Activity');

  const navigate = useNavigate()

  const handleLocationInput = (e) => {
    const { name, value } = e.target;

    setTripDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
    }));
};

const handleLocationChange = () => {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: tripDetails.location }, (results, status) => {
      if (status === 'OK') {
          const { lat, lng } = results[0].geometry.location;
          setMarkerPosition({ lat: lat(), lng: lng() });
      } else {
          alert('Location not found!');
      }
  });
};

const handleActivityInput = (activity) => {
  setSelectedActivity(activity);
  setTripDetails((prevDetails) => ({
    ...prevDetails,
    activity: activity,
  }));
};

const handleTripLogInput = (e) => {
  setTripDetails((prevDetails) => ({
    ...prevDetails,
    tripLog: e.target.value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!tripDetails.location || !tripDetails.activity || tripDetails.activity === 'Select Activity') {
    alert('Please fill in all fields');
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "trips"), {
      location: tripDetails.location,
      activity: tripDetails.activity,
      tripLog: tripDetails.tripLog || '',
      createdAt: new Date().toISOString(),
    });

    setTripDetails({
      ...tripDetails,
      id: docRef.id,
      isCreated: true 
    });
  } catch (error) {
    console.error("Error saving trip:", error);
    alert("Failed to save trip.");
  }
};

const handleReset = () => {
  setTripDetails({
    location: '',
    activity: '',
    tripLog: '',
    isCreated: false
  });
  
  setSelectedActivity('Select Activity');
  
  setMarkerPosition({ lat: 37.7749, lng: -122.4194 });
};

  return (
    <div className="trip-form-container">
      {!tripDetails.isCreated ? (
        <div className="create-trip-form">
          <h2>Trip Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Where are you going?</label>
              <div className="location-input">
                <input 
                  type="text"
                  name="location"
                  value={tripDetails.location}
                  onChange={handleLocationInput}
                  placeholder="Enter a location"
                  className="location-field"
                />
                <button 
                  type="button" 
                  onClick={handleLocationChange}
                  className="set-location-button"
                >
                  Set
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label>What will you do there?</label>
              <ActivityDropdown
                selectedActivity={selectedActivity}
                setSelectedActivity={handleActivityInput}
              />
            </div>
            
            <div className="form-group">
              <label>Trip Log (optional)</label>
              <textarea
                name="tripLog"
                value={tripDetails.tripLog || ''}
                onChange={handleTripLogInput}
                placeholder="Write about your trip plans, experiences, or anything you want to remember..."
                className="trip-log-field"
                rows="5"
              ></textarea>
            </div>
            
            <Image />
            
            <div className="form-actions">
              <button type="submit" className="create-button">
                <span className="button-icon">✨</span>
                Create Trip
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="success-container">
          <div className="success-header">
            <h2>Trip Created!</h2>
          </div>
          
          <div className="trip-summary">
            <div className="summary-item">
              <span className="summary-icon">📍</span>
              <div>
                <h3>Location</h3>
                <p>{tripDetails.location}</p>
              </div>
            </div>
            
            <div className="summary-item">
              <span className="summary-icon">🎯</span>
              <div>
                <h3>Activity</h3>
                <p>{tripDetails.activity}</p>
              </div>
            </div>
          </div>
          
          <div className="qr-container">
            <h3>Share this trip</h3>
            <TripQRCode tripId={tripDetails.id} />
          </div>
          
          <div className="success-actions">
            <button 
              onClick={handleReset}
              className="new-trip-button"
            >
              Create Another Trip
            </button>
            
            <button 
              onClick={() => navigate('/trips')}
              className="view-all-button"
            >
              View All Trips
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TripForm