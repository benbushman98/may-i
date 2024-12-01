import React, { useState, useEffect } from 'react';

const Start = ({ closeModal }) => {
    const [players, setPlayers] = useState(['', '']);
    const [playerCount, setPlayerCount] = useState(2);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = players.filter(player => player.trim() !== '').length >= 2;
        setIsFormValid(isValid);
    }, [players]);

    const handleChange = (index, event) => {
        const newPlayers = [...players];
        newPlayers[index] = event.target.value;
        setPlayers(newPlayers);
    };

    const addPlayer = () => {
        if (playerCount < 5) {
            setPlayers([...players, '']);
            setPlayerCount(playerCount + 1);
        }
    };

    const handleStart = () => {
        localStorage.setItem('players', JSON.stringify(players));
        localStorage.setItem('game', true);
        closeModal();
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">Enter Player Names</h1>
            {players.map((player, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-lg mb-2">Player {index + 1}:</label>
                    <input
                        type="text"
                        value={player}
                        onChange={(event) => handleChange(index, event)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            ))}
            {playerCount < 5 && (
                <button
                    onClick={addPlayer}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Add Another Player
                </button>
            )}
            <button
                onClick={handleStart}
                className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isFormValid}
            >
                Start
            </button>
        </div>
    );
};

export default Start;