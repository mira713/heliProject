import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Team from '../pages/Team';
import Cards from '../pages/cards'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/"element={<Cards/>}/>
            <Route path="/team" element={<Team/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes