import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css'
import {auth} from './services/firebase'
import Login from './features/auth/Login'
import Dashboard from './features/dashboard/Dashboard'
import { onAuthStateChanged } from 'firebase/auth'
import NewTrip from './features/trips/NewTrip';
import NewTripRoutes from './routes/NewTripRoutes';
import TripPage from './features/trips/TripPage';
import AllTrips from './features/dashboard/AllTrips';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    });
    
    return () => unsubscribe();
  }, [])


  return (
    <Router>
      <Routes>
        {/* Public route - accessible without login */}
        <Route path="/trips/:tripId" element={<TripPage />} />

        {/* Protected routes - require login */}
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/new-trip/*" element={<NewTripRoutes user={user} />} />
            <Route path="/trips" element={<AllTrips />} />
          </>
        ) : (
          <Route path="/" element={<Login setUser={setUser} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App
