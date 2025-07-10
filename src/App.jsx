import React, { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '1234567890';
    if (charAllowed) str += '~!@#$%^&*()_+[]';

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  function copyPasswordToClipboard() {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">🔐 Password Generator</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={password}
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
            className="flex-1 p-2 border border-gray-300 rounded-l-xl outline-none text-sm"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-indigo-600 text-white px-4 rounded-r-xl hover:bg-indigo-700 transition"
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="length" className="block text-gray-700 mb-1">
            Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min={4}
            max={32}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full cursor-pointer"
          />
        </div>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="numbers"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="mr-2"
          />
          <label htmlFor="numbers" className="text-gray-700">Include Numbers</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="characters"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="mr-2"
          />
          <label htmlFor="characters" className="text-gray-700">Include Special Characters</label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
