import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import Footer from './Footer';
import './HomePage.css';
import Cards from './Cards';

function Home() {
    useEffect(() => {
        document.body.classList.add('homePageStyles');
        return () => {
            document.body.classList.remove('homePageStyles');
        };
    }, []);

    return (
        <>
            <HeroSection />
            <Cards />
            <Footer />
        </>
    );
}

export default Home;
