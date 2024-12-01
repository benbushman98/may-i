import React from 'react';
import { useState } from 'react';

const Score = ({playerName, closeModal}) => {
    const [score, setScore] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (score) {
            const existingScores = JSON.parse(localStorage.getItem(playerName)) || [];
            const newScore = { [`Round ${round}`]: score };
            localStorage.setItem(playerName, JSON.stringify([...existingScores, newScore]));
            setScore('');
            closeModal();
        } else {
            alert('Please enter a valid round and score.');
        }
    };
    const getNextRound = () => {
        const existingScores = JSON.parse(localStorage.getItem(playerName)) || [];
        for (let i = 1; i <= 7; i++) {
            if (!existingScores.some(score => score.hasOwnProperty(`Round ${i}`))) {
                return i;
            }
        }
        return null;
    };

    const round = getNextRound();

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">{playerName}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Score:</label>
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    disabled={!score}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Score;