import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MediaReady from './pages/MediaReady'
import VideoPanel from './pages/VideoPanel'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/media-check/:roomId' element={<MediaReady />} />
          <Route path='/room/:roomId' element={<VideoPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

