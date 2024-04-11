import React from 'react';
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="HeroSectionMain">
            <video src="/Videos/CarVideoHome.mp4" autoPlay loop muted></video>
            <h1>Unlock the Journey</h1>
            <p>Your adventure starts with a royal key turn.</p>
        </div>
    );
}

export default HeroSection;
