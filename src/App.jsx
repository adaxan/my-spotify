import React, { useEffect } from 'react'

import { Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Likes from './pages/Likes'
import Detailes from './pages/Detailes'
import http  from './axios'
import MainLayout from './Layout/MainLayout'

function App() {
 
  return (
    <div>
<Routes>
<Route path='/' element={<MainLayout><Home></Home></MainLayout>}></Route>
<Route path='/likes' element={<MainLayout><Likes></Likes></MainLayout>}></Route>
<Route path='/playlists/:id' element={<MainLayout><Detailes></Detailes></MainLayout>}></Route>




</Routes>

    </div>
  )
}

export default App