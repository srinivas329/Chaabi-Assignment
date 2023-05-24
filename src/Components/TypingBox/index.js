import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup'

import './index.css'

const TypingApp = () => {
  const [userInput, setUserInput] = useState('');
  const [nextKeys, setNextKeys] = useState('');
  const [keyCount, setKeyCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300);

 

  const onclickButton = () => {
    setNextKeys("")
    setKeyCount(0)
    setAccuracy(0)
    generateNextKeys();
    let interval
    if (timer <= 0){
        setTimer(30)
        generateNextKeys();
    }else{
         interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);
    }

  }

  const handleInputChange = (e) => {
    const input = e.target.value;

    // Update user input
    setUserInput(input);

    // Check accuracy
    const accuracyPercentage = calculateAccuracy(input);
    setAccuracy(accuracyPercentage);

    // Check if all expected keys are entered
    if (input.length === nextKeys.length) {
      // Increment key count
      setKeyCount(prevKeyCount => prevKeyCount + input.length);

      // Clear user input
      setUserInput('');

      // Generate next keys
      generateNextKeys();
    }
  };

  const calculateAccuracy = (input) => {
    const expectedKeys = nextKeys.slice(0, input.length);
    let correctCount = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === expectedKeys[i]) {
        correctCount++;
      }
    }

    return Math.round((correctCount / input.length) * 100);
  };

  const generateNextKeys = () => {
    const keys = 'asdfjkl;';
    const nextKey = keys[Math.floor(Math.random() * keys.length)];

    setNextKeys(prevNextKeys => prevNextKeys + nextKey);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (seconds > 0){
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }else{
        return '00:00'
    }
    
  };

  return (
    
    <div className='bg-container'>
      <h1 className='heading'>Typing Test</h1>
      <Popup
     trigger={
       <button type="button" className="pop-button">
         Finger Position
       </button>
     }
     position="bottom center"
   >
     <div>
        <img className='pop-image' src="https://res.cloudinary.com/dxvsvzsai/image/upload/v1684908185/keybd_hand_position_mac_1_wfsw3r.jpg" alt="type-image"/>
     </div>
   </Popup>
      <p className='timing'>Timing: <span className='timer-span'>{formatTime(timer)}</span></p>
      <p className='time-up'>{timer === 0 ?"Time Up!!!!" : ""}</p>
      <p className='keys'>{nextKeys}</p>
      <input placeholder='Re-Type' className='input-ele' type="text" value={userInput} onChange={handleInputChange} />
      <button className='button' onClick={onclickButton}>Start Typing</button>
      <div className='calculation-tab'>
        <p className='key-count'>Key Count: <span className='span-count'>{keyCount}</span></p>
        <p className='accuracy'>Accuracy: <span className='accuracy-span'>{accuracy}%</span></p>
      </div>
    </div>
  );
};

export default TypingApp;
