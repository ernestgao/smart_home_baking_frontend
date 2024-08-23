import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://really-touching-gull.ngrok-free.app', {
  extraHeaders: {
    "ngrok-skip-browser-warning": "69420"
  }
});

function ScaleDisplay() {
    const [value, setValue] = useState('');
  
    useEffect(() => {
      socket.on('data', (data) => {
        setValue(data.weight);
      });
  
      return () => {
        socket.off('data');
      };
    }, []);
  
    return (
      <div>
        <h1>Weight Sensor Value</h1>
        <p>{value}</p>
      </div>
    );
  }

export default ScaleDisplay;
