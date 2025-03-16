import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewTrip from '../features/trips/NewTrip'
import Redirect from '../Redirect'

const NewTripRoutes = ({user}) => {
  return (
    <Routes>
        <Route path="/" element={<NewTrip user={user}></NewTrip>}></Route>
        <Route path="/redirect" element={<Redirect></Redirect>}></Route>
    </Routes>
  )
}

export default NewTripRoutes