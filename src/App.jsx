import { useState } from 'react';
import './App.css';

function App() {
  const [namesInput, setNamesInput] = useState('');
  const [pickedName, setPickedName] = useState(null);
  const [lineup, setLineup] = useState([]);
  const [isPicking, setIsPicking] = useState(false);

  // Helper function to extract names
  const getNamesList = () => {
    return namesInput
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);
  };

  const handlePickRandom = () => {
    const namesList = getNamesList();
    if (namesList.length === 0) return;

    setIsPicking(true);
    setPickedName(null);
    setLineup([]);

    // Simple animation effect
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * namesList.length);
      setPickedName(namesList[randomIndex]);
      count++;

      if (count > 15) {
        clearInterval(interval);
        setIsPicking(false);
      }
    }, 50);
  };

  const handleGenerateLineup = () => {
    const namesList = getNamesList();
    if (namesList.length === 0) return;

    // Shuffle using Fisher-Yates algorithm
    const shuffled = [...namesList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setLineup(shuffled);
    setPickedName(null);
  };

  const handleClear = () => {
    setNamesInput('');
    setPickedName(null);
    setLineup([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 my-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Random Name Picker</h1>
          <p className="text-gray-500">Enter names separated by commas</p>
        </div>

        <div className="space-y-6">
          <div>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cricket-primary focus:border-cricket-primary outline-none transition-all resize-none h-32 text-gray-700 bg-gray-50"
              placeholder="e.g. Alice, Bob, Charlie"
              value={namesInput}
              onChange={(e) => setNamesInput(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button
                onClick={handleClear}
                className="px-6 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors w-1/3"
              >
                Clear
              </button>
              <button
                onClick={handlePickRandom}
                disabled={isPicking || namesInput.trim().length === 0}
                className="flex-1 py-3 px-6 rounded-xl font-medium text-white bg-cricket-primary hover:bg-cricket-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {isPicking ? 'Picking...' : 'Pick a Random Name'}
              </button>
            </div>

            <button
              onClick={handleGenerateLineup}
              disabled={isPicking || namesInput.trim().length === 0}
              className="w-full py-3 px-6 rounded-xl font-medium text-cricket-primary border-2 border-cricket-primary hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              Generate Random Lineup
            </button>
          </div>

          {pickedName && (
            <div className={`mt-8 p-6 rounded-xl text-center transition-all duration-300 ${isPicking ? 'bg-gray-100 animate-pulse' : 'bg-green-50 border border-green-200 shadow-sm animate-pop-in'}`}>
              <p className="text-sm text-gray-500 mb-2">{isPicking ? 'Selecting...' : 'Winner!'}</p>
              <p className={`text-4xl font-bold ${isPicking ? 'text-gray-600' : 'text-green-600'}`}>
                {pickedName}
              </p>
            </div>
          )}

          {lineup.length > 0 && !isPicking && !pickedName && (
            <div className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-200 shadow-sm animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Random Lineup</h2>
              <ul className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {lineup.map((name, index) => (
                  <li
                    key={index}
                    className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm text-gray-700 flex items-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="font-bold text-gray-400 w-8 text-right mr-3">{index + 1}.</span>
                    <span className="font-medium text-lg text-gray-800">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
