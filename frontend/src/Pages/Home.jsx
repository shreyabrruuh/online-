import React from 'react';
import './Home.css';

const AnimatedText = () => {
  const phrases = ['Code', 'Learn', 'Grow'];
  return (
    <div className="animated-text">
      {phrases.map((phrase, index) => (
        <span key={index} className="text-item">{phrase}</span>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div className="main-container bg-gray-900 h-screen flex flex-col items-center justify-center text-white">
      <AnimatedText />
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6 tracking-wide">
          Let's Practice Together And Grow
        </h1>
        <p className="text-lg mb-8">
          Join us on the journey to mastery
        </p>
        <button className="get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;

