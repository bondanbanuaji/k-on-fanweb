import React from "react";

import "../assets/css/GoTop.css"

const GoTop = () => {
    const scrollToHero = () => {
        const hero = document.getElementById("hero");
        if (hero) {
            hero.scrollIntoView({ behavior: "smooth" });
        }
    };

    const letters = "go top".split("");

    return (
        <div className="go-top-container" onClick={scrollToHero}>
            <div className="go-top-content-wrapper">
                <div className="go-top-letters">
                    {letters.map((char, index) => (
                        <div key={index} className="go-top-letter">
                            {char}
                        </div>
                    ))}
                </div>
                <div className="go-top-line"></div>
            </div>
        </div>
    );
};

export default GoTop;
