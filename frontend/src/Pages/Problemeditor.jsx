import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import LangSelector from '../Components/Language_selector';

const ProbEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                if (!id) throw new Error('Problem ID is undefined');
                const response = await axios.get(`http://localhost:8000/problem/${id}`);
                const problemData = response.data;
                setProblem(problemData);
                setCode(problemData.initialCode || '');
                setLanguage(problemData.language || 'cpp');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching problem', error);
                setError('Error fetching problem');
                setLoading(false);
            }
        };

        if (id) {
            fetchProblem();
        } else {
            setError('Problem ID is undefined');
            setLoading(false);
        }
    }, [id]);

    const onSelect = (language) => {
        setLanguage(language);
    };

    const handleSubmit = async () => {
        const payload = { language, code, input };
        try {
            const { data } = await axios.post(`http://localhost:5000/run`, payload);
            setOutput(data.output1);
        } catch (error) {
            console.log(error.response);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!problem) return <div>No problem data available.</div>;

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">{problem.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-2">Level: {problem.level}</p>
                            <p className="text-sm mb-2">Description: {problem.description}</p>
                            <p className="text-sm mb-2">Input Format: {problem.inputFormat}</p>
                            <p className="text-sm mb-2">Output Format: {problem.outputFormat}</p>
                        </div>
                    </div>
                    <div>
                        <div className="mb-4">
                            <LangSelector language={language} onSelect={onSelect} />
                        </div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <Editor
                            height="70vh"
                            theme="vs-dark"
                            language={language}
                            onChange={(value) => setCode(value)}
                            value={code}
                        />
                    </div>
                    <div className="col-span-1">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Input</h2>
                            <textarea
                                rows="5"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                placeholder="Input"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Output</h2>
                            <p className="p-2 border border-gray-300 rounded-lg min-h-40">{output}</p>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleSubmit}
                                className="w-1/2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                            >
                                Run
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProbEditor;
