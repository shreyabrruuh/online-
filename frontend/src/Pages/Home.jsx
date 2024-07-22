import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';
import codingImg from '../assets/code-typing-concept-illustration_114360-4296 copy.avif';

const AnimatedText = () => {
  const phrases = ['Code', 'Learn', 'Grow'];

  return (
    <div className="animated-text flex space-x-4 text-4xl font-extrabold">
      {phrases.map((phrase, index) => (
        <motion.span
          key={index}
          className="text-item"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
        >
          {phrase}
        </motion.span>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div className="main-container h-screen flex flex-col items-center justify-center text-black relative">
      <div className="background-image"></div>
      <AnimatedText />
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h1 className="text-6xl font-extrabold mb-6 tracking-wide">
          Let's Practice Together And Grow
        </h1>
        <p className="text-lg mb-8 font-bold">
          Join us on the journey to mastery
        </p>
        <Link to='/login'>
          <motion.button
            className="get-started-btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Welcome
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default Home;
