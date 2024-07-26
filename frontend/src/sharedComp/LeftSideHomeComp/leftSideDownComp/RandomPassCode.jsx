import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Slider, Switch, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#9333ea',
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark' ? 'rgb(58 143 242 / 16%)' : 'rgb(58 143 242 / 16%)'}`
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${theme.palette.mode === 'dark' ? 'rgb(58 143 242 / 16%)' : 'rgb(58 143 242 / 16%)'}`
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.28,
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#9333ea',
    '&:hover': {
      backgroundColor: 'rgba(58, 143, 242, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#9333ea',
  },
}));

const RandomPassCode = () => {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+{}[]|:;<>,.?/~`';
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="h-[86vh] bg-zinc-950 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Password Generator</h1>
        
        <div className="relative mb-6 text-black">
          <input
            type="text"
            value={password}
            className="w-full bg-gray-100 p-4 pr-12 rounded-lg font-mono text-lg outline-none"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={passwordGenerator}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <Tooltip title={copied ? "Copied!" : "Copy to clipboard"} placement="top" arrow>
            <button
              onClick={copyPasswordToClipboard}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </Tooltip>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Length: {length}</label>
          <StyledSlider
            value={length}
            onChange={(_, newValue) => setLength(newValue)}
            min={4}
            max={30}
            valueLabelDisplay="auto"
            
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Numbers</span>
          <StyledSwitch
            checked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
          />
        </div>

        <div className="flex justify-between items-center mb-5">
          <span className="text-sm font-medium text-gray-700">Symbols</span>
          <StyledSwitch
            checked={characterAllowed}
            onChange={() => setCharacterAllowed(prev => !prev)}
          />
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
};

export default RandomPassCode;