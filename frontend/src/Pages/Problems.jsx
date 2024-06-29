import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Problems = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/problem');
      setProblems(response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  const deleteProblem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/problem/${id}`);
      setProblems(problems.filter((problem) => problem._id !== id));
      console.log('Problem deleted successfully');
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  return (
    <div className="main-container min-h-[670px] h-auto bg-white text-gray-800">
      <div className="flex justify-end p-4">
        <Link to="/createProb" className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors">
          Write Your Own Problem
        </Link>
      </div>
      {problems.map((problem) => (
        <div key={problem._id} className="problem-card bg-gray-200 rounded-lg shadow-lg mb-6">
          <h1 className="text-2xl font-bold text-gray-800 p-4">{problem.category}</h1>
          <div className="p-4 flex flex-col gap-4">
            <div className="problem-details flex gap-4">
              <div className="w-32 h-24 bg-gray-300 rounded-lg"></div>
              <div className="flex-1">
                <p className="font-bold text-xl">{problem.title}</p>
                <p className="text-gray-600 mb-4">Level: {problem.level}</p>
                <div className="description-box bg-white rounded-lg p-4 border border-gray-300">
                  <p className="text-gray-800">{problem.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => deleteProblem(problem._id)}
              >
                Delete
              </button>
              <Link to={`/editor/${problem._id}`} className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors ml-2">
                Solve
              </Link>
              <Link to={`/editProb/${problem._id}`} className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors ml-2">
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Problems;
