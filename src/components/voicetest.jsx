import React, { useState } from 'react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

function VoiceInput() {
  const url = "https://really-touching-gull.ngrok-free.app";
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const startVoiceRecognition = () => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      process.env.REACT_APP_SPEECH_KEY,
      process.env.REACT_APP_SPEECH_REGION
    );
    speechConfig.speechRecognitionLanguage = 'zh-CN';

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(async (result) => {
      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        const userVoiceInput = result.text;
        setInput(userVoiceInput);

        // Send the recognized text to the backend
        const res = await fetch(`${url}/voice-command`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ command: userVoiceInput }),
        });
        const data = await res.json();
        setResponse(data.messages);

      } else {
        console.error('Speech recognition failed:', result.errorDetails);
      }
      recognizer.close();
    });
  };

  return (
    <div>
      <button onClick={startVoiceRecognition}>Speak</button>
      <p>You said: {input}</p>
      <p>Bot Response: {response}</p>
    </div>
  );
}

export default VoiceInput;
