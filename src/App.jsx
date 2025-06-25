import { useState } from 'react'
import { Router, Routes, Route, Link } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Classes from './pages/Classes'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import './App.css'

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/events" element={<Events />} /> {/* List of events */}
                <Route path="/events/:eventId" element={<Events />} /> {/* Specific event details */}
                <Route path="about" element={<About />} />
                <Route path="classes" element={<Classes />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<Faq />} />
            </Route>
        </Routes>
    </>
);
}

export default App
