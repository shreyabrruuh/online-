import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Lang_selector from '../Components/Lang_selector.jsx';
import DOMPurify from 'dompurify';
import { useAuth } from '../AuthContext.jsx';

const Prob_editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role, user } = useAuth();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [verdict, setVerdict] = useState('');
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [submissionCount, setSubmissionCount] = useState(0);

  const boilerplateCode = {
    cpp: `#include <iostream>
    int main() { 
        std::cout << "Hello World!"; 
        return 0; 
    }`,
    java: `public class Main {
      public static void main(String[] args) {
          System.out.println("Hello World!");
      }
    }`,
    py: `def main():
    print("Hello World!")
    if __name__ == "__main__":
        main()`
  };

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get(`http://localhost:5179/code/get/${id}`);
        if (response.data.code) {
          setCode(response.data.code);
        } else {
          setCode(boilerplateCode[language]);
        }
      } catch (error) {
        console.error('Error fetching code', error);
      }
    };

    const fetchProblem = async () => {
      try {
        if (!id) {
          throw new Error('Problem ID is undefined');
        }
        const response = await axios.get(`http://localhost:5179/problem/${id}`);
        const problemData = response.data;
        setProblem(problemData);
        setTestCases(response.data.TestCases);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchCode();
      fetchProblem();
    } else {
      setError('Problem ID is undefined');
      setLoading(false);
    }
  }, [id, language]);

  useEffect(() => {
    const saveCode = async () => {
      try {
        await axios.post('http://localhost:5179/code/save', {
          id,
          code
        });
      } catch (error) {
        console.error('Error saving code', error);
      }
    };

    saveCode();
  }, [code, id]);

  const onSelect = (language) => {
    setLanguage(language);
    setCode(boilerplateCode[language]);
  };

  const handleRun = async () => {
    console.log('handleRun called');
    const payload = { language, code, input };
    try {
      const { data } = await axios.post(`http://localhost:5179/compile`, payload);
      console.log(data);
      setOutput(data.output1);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmission = async () => {
    const payload = {
      userId: user, // Assuming user object has an id field
      problemId: id,
      title: problem.title, // Assuming you have the title of the problem
      language,
      code,
      verdict: verdict || 'Pending',
      count: submissionCount
    };
    try {
      const { data } = await axios.post(`http://localhost:5179/submission`, payload);
      console.log("Count:", data.count);
      setSubmissionCount(prevCount => prevCount + 1);
    } catch (error) {
      console.log("Error fetching submissionCount:", error.response);
    }
  };

  const handleSubmit = async () => {
    console.log('handleSubmit called');
    const payload = { userId: user, problemId: id, language, code };
    try {
      const { data } = await axios.post(`http://localhost:5179/submit`, payload);
      console.log(data);
      setVerdict(data.verdict);
      setTestCaseResults(data.results);
      await handleSubmission();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5179/problem/${id}`);
      alert('Problem deleted successfully');
      navigate('/problems');
    } catch (error) {
      console.error('Error deleting problem:', error.response);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
      <div>
        <h1 className="text-xl md:text-7xl font-bold flex items-center">
          L
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
          </svg>
          ading . . .
        </h1>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
      <h1 className="text-2xl font-bold mb-6">Error: {error}</h1>
    </div>
  );

  if (!problem) return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
      <h1 className="text-2xl font-bold mb-6">No problem data available.</h1>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24 dark:bg-gray-950">
      <h1 className="text-3xl font-bold mb-6">{problem.title}</h1>
      <div className="text-lg mb-4">
        <p>{problem.description}</p>
      </div>

      <div className="mb-6">
        <Lang_selector onSelect={onSelect} />
      </div>

      <Editor
        height="400px"
        language={language}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
      />

      <div className="mt-6">
        <textarea
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-100"
          placeholder="Input"
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handleRun}
        >
          Run
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 ml-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {role === 'admin' && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ml-4"
            onClick={handleDelete}
          >
            Delete Problem
          </button>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Output:</h2>
        <pre className="p-4 border rounded-lg mt-2 dark:bg-gray-800 dark:text-gray-100">{output}</pre>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Test Case Results:</h2>
        <ul className="list-disc pl-5 mt-2">
          {testCaseResults.map((result, index) => (
            <li key={index} className={`p-2 ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
              Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Link to={`/problems`} className="text-blue-500 underline">
          Back to Problems
        </Link>
      </div>
    </div>
  );
};

export default Prob_editor;
