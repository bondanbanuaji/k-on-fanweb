import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import CursorPointer from './hooks/CursorPointer';

const App = () => {
    return (
        <main className="relative w-screen min-h-screen overflow-x-hidden">
            <CursorPointer />
            <video
            autoPlay
            muted
            loop
            id="background-video">
                <source src="/public/img/wallpaperbg.mp4" type="video/mp4"/>
            </video>
                <Navbar />
                <Hero />
                <About />
                <Features />
                <Story />
                <Contact />
                <GoTop />
                <Footer />
            
        </main>
    )
}

export default App