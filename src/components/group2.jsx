import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/group2.scss";
import logo from "../assets/group2/BaKing.png";
import adjustIcon from "../assets/group2/调整食谱浅.png";
import assistIcon from "../assets/group2/辅助烘焙深.png";
import evaluateIcon from "../assets/group2/成果评价浅.png";
import finishIcon from "../assets/group2/完成.png";
import helpIcon from "../assets/group2/帮助.png";
import robot from "../assets/group2/机器人.png";
import ButtonImage from "../assets/group2/button.png";
import RobotImage from "../assets/group2/robot.png";
import BubbleIcon from "../assets/group2/bubble.png";
import butterImage from "../assets/group2/黄油.png";
import sugarImage from "../assets/group2/细砂糖.png";
import flourImage from "../assets/group2/面粉.png";
import liquidImage from "../assets/group2/蛋液.png";
import berryImage from "../assets/group2/蔓越莓.png";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

import io from 'socket.io-client';

const socket = io('https://really-touching-gull.ngrok-free.app', {
  extraHeaders: {
    "ngrok-skip-browser-warning": "69420"
  }
});

const Group2 = () => {
  const url = "https://really-touching-gull.ngrok-free.app";
  const uid = useRef("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actualOil, setActualOil] = useState(0);
  const [actualSugar, setActualSugar] = useState(0);
  const [actualLiquid, setActualLiquid] = useState(0);
  const [actualFlour, setActualFlour] = useState(0);
  const [actualBerry, setActualBerry] = useState(0);
  const actualSum =
    actualOil + actualSugar + actualLiquid + actualFlour + actualBerry;
  const [oil, setOil] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [liquid, setLiquid] = useState(0);
  const [flour, setFlour] = useState(0);
  const [berry, setBerry] = useState(0);
  const sum = oil + sugar + liquid + flour + berry;
  // initialization
  useEffect(() => {
    const apiUrl = url + "/display";
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        uid.current = result.uid;
        getResults(result);
        initializeItems(result.result.amount);
      } catch (error) {
        setError(error.message);
        console.log("error fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (recognizerRef.current && !recognizerState.current.disposed) {
        recognizerRef.current.close();
        recognizerState.current.disposed = true;
        console.log("Recognizer cleaned up on unmount.");
      }
      if (audioContextRef.current) {
        audioContextRef.current.close(); // Clean up AudioContext
        console.log("AudioContext cleaned up.");
      }
    };
  }, []);

  const getResults = (results) => {
    let result = results.result;
    const extractedAmount = result.amount;

    // Set the amounts
    setSugar(extractedAmount.sugar);
    setOil(extractedAmount.oil);
    setLiquid(extractedAmount.liquid);
    setFlour(extractedAmount.flour);
    setBerry(extractedAmount.berry);
  };

  //steps
  const [currentText, setCurrentText] = useState(0);
  const textsBox1 = [
    "步骤1/6",
    "步骤2/6",
    "步骤3/6",
    "步骤4/6",
    "步骤5/6",
    "步骤6/6",
  ];
  const textsBox2 = [
    "软化黄油，在黄油中加入细砂糖，搅打至黄油微微发白，得到糖油混合物。",
    "在糖油混合物中加入蛋白液，搅打至完全乳化，得到混合物（A）。",
    "切碎蔓越莓干，将蔓越莓干碎加入低筋面粉，充分搅拌，得到混合物（B）。",
    "将（A）和（B）充分混合得到面团，将面团放入铺有保鲜膜的模具塑形。",
    "将塑形后的面团放到冰箱中冷冻30分钟，面团变硬后取出，切成约0.5厘米的薄片。",
    "烤箱预热，上火160度，下火150度，烘烤约20分钟后取出，静置冷却。",
  ];
  const changeText = (direction) => {
    let newTextIndex = currentText + direction;
    if (newTextIndex < 0) {
      newTextIndex = textsBox1.length - 1;
    } else if (newTextIndex >= textsBox1.length) {
      newTextIndex = 0;
    }
    setCurrentText(newTextIndex);
  };

  // scale and timer tabs
  const [activeTab, setActiveTab] = useState("foodScale");
  //scale
  const [showChat, setShowChat] = useState(false);


  const [items, setItems] = useState([
    { text: "黄油", image: butterImage, largeNumber: 0, smallNumber: 0 },
    { text: "细砂糖", image: sugarImage, largeNumber: 0, smallNumber: 0 },
    { text: "蛋白液", image: liquidImage, largeNumber: 0, smallNumber: 0 },
    { text: "低筋面粉", image: flourImage, largeNumber: 0, smallNumber: 0 },
    { text: "蔓越莓干", image: berryImage, largeNumber: 0, smallNumber: 0 },
  ]);

  const [currentItem, setCurrentItem] = useState(0);

  const initializeItems = (amounts) => {
    setItems((prevItems) =>
      prevItems.map((item, index) => {
        switch (index) {
          case 0:
            return { ...item, smallNumber: amounts.oil };
          case 1:
            return { ...item, smallNumber: amounts.sugar };
          case 2:
            return { ...item, smallNumber: amounts.liquid };
          case 3:
            return { ...item, smallNumber: amounts.flour };
          case 4:
            return { ...item, smallNumber: amounts.berry };
          default:
            return item;
        }
      })
    );
  };

  const updateContent = (index) => {
    saveActual();
    if (index < 0) {
      setCurrentItem(items.length - 1);
    } else if (index >= items.length) {
      setCurrentItem(0);
    } else {
      setCurrentItem(index);
    }
  };
    
  const changeQuantity = (setQuantity, currentQuantity, delta) => {
    const newValue = currentQuantity + delta;
    if (newValue >= 0) {
      setQuantity(newValue);
    }
  };

  const [time, setTime] = useState(30);
  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(time * 60);

  // const [scalevalue, setScaleValue] = useState(0);
  
  useEffect(() => {
    socket.on("data", (data) => {
      const scaleValue = parseInt(data.weight, 10);
      setItems((prevItems) =>
        prevItems.map((item, index) =>
          index === currentItem ? { ...item, largeNumber: scaleValue } : item
        )
      );
    });

    return () => {
      socket.off("data");
    };
  }, [currentItem]);

  const progressPercentage =
  items[currentItem].smallNumber > 0
    ? (items[currentItem].largeNumber / items[currentItem].smallNumber) * 100
    : 0;

  const saveActual = () => {
    const scale = items[currentItem].largeNumber;
    switch (currentItem) {
      case 0:
        setActualOil(scale);
        break;
      case 1:
        setActualSugar(scale);
        break;
      case 2:
        setActualLiquid(scale);
        break;
      case 3:
        setActualFlour(scale);
        break;
      case 4:
        setActualBerry(scale);
        break;
      default:
        console.warn("Unknown item index");
        break;
    }
  };

  useEffect(() => {
    let countdown;
    if (isCounting && !isPaused) {
      countdown = setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(countdown);
            setIsCounting(false);
            alert("Time's up!");
            setMessages((prevMessages) => [
              ...prevMessages,
              { type: "bot", text: "您好，计时时间到了。" },
            ]);
            return prevSeconds;
          }
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isCounting, isPaused]);

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleDecrease = () => {
    if (!isCounting && time > 1) {
      setTime(time - 1);
      setSecondsLeft((time - 1) * 60);
    }
  };

  const handleIncrease = () => {
    if (!isCounting) {
      setTime(time + 1);
      setSecondsLeft((time + 1) * 60);
    }
  };

  const handleStart = () => {
    setIsCounting(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleCancel = () => {
    setIsCounting(false);
    setIsPaused(false);
    setTime(30);
    setSecondsLeft(30 * 60);
  };

  const [audioContextInitialized, setAudioContextInitialized] = useState(false);

  const toggleChatShow = async () => {
    setShowChat((prevShowChat) => !prevShowChat);
    try {
      await checkMicrophonePermissions();
      await ensureAudioContext();
      setAudioContextInitialized(true);
      console.log("AudioContext initialized manually.");
      startListeningForKeyword();
    } catch (error) {
      console.error("Failed to initialize AudioContext manually:", error);
      alert("Failed to initialize audio. Please try again.");
    }
  };

  const [messages, setMessages] = useState([
    { type: "bot", text: "您好，需要我时请呼唤“Yummy（呀咪）" },
  ]);
  // const [input, setInput] = useState("");
  // const [isListeningKey, setIsListeningKey] = useState(false);
  const [isListening, setIsListening] =  useState(false);

  const recognizerRef = useRef(null);
  const recognizerState = useRef({ disposed: false });
  const keyword = "yummy"; // Define the keyword


  const initializeRecognizer = (speechConfig, audioConfig) => {
    if (recognizerRef.current != null) {
      if (!recognizerState.current.disposed){
        recognizerRef.current.close();
        recognizerState.current.disposed = true;
      }
    }
    recognizerRef.current = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    recognizerState.current.disposed = false;
  };

  const startListeningForKeyword = () => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      process.env.REACT_APP_SPEECH_KEY,
      process.env.REACT_APP_SPEECH_REGION
    );
    speechConfig.speechRecognitionLanguage = "en-US";
  
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

    initializeRecognizer(speechConfig, audioConfig);

    const recognizer = recognizerRef.current;
  
    // setIsListeningKey(true);
    let keywordDetected = false;
  
    recognizer.recognizing = (s, e) => {
      if (keywordDetected) return;
      console.log(`Recognizing keyword: ${e.result.text}`);
      if (e.result.text.toLowerCase().includes(keyword)) {
        recognizer.stopContinuousRecognitionAsync(() => {
          console.log("Keyword detected. Starting voice recognition...");
          // recognizer.close();
          // setIsListeningKey(false);
          setIsListening(true);
          startVoiceRecognition(() => {
            // Reset `keywordDetected` when transitioning back
            keywordDetected = false;
          });
        });
      }
    };
  
    recognizer.canceled = (s, e) => {
      console.error(`Keyword detection canceled: ${e.errorDetails}`);
      // setIsListeningKey(false);
      // recognizer.close();
    };
  
    recognizer.startContinuousRecognitionAsync(
      () => console.log("Started keyword spotting."),
      (err) => {
        console.error(`Failed to start keyword spotting: ${err}`);
        // setIsListeningKey(false);
        // recognizer.close();
      }
    );
  };
  
  const startVoiceRecognition = (onComplete) => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      process.env.REACT_APP_SPEECH_KEY,
      process.env.REACT_APP_SPEECH_REGION
    );
    speechConfig.speechRecognitionLanguage = "zh-CN";
  
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

    initializeRecognizer(speechConfig, audioConfig);

    const recognizer = recognizerRef.current;
  
    console.log("Starting single recognition session...");
    recognizer.recognizeOnceAsync(
      async (result) => {
        if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          const recognizedText = result.text.trim();
          console.log(`Recognized Text: ${recognizedText}`);

          // Convert Chinese numerals to Arabic numbers
        const convertedText = recognizedText.replace(/[一两二三四五六七八九十百千]+/g, (match) =>
          chineseToArabic(match)
        );
        console.log(`Converted Text: ${convertedText}`);
  
          if (convertedText) {
            try {
              console.log(`Sending recognized text to backend: ${convertedText}`);
              const response = await fetch(`${url}/voice-command`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: convertedText }),
              });
              const data = await response.json();
              console.log(data);
              setMessages((prevMessages) => [
                ...prevMessages,
                { type: "user", text: convertedText },
                { type: "bot", text: data.messages || "No response received." },
              ]);

              if (data.commands) {
                handleCommands(data.commands.command, data.commands.parameters);
              }
            } catch (error) {
              console.error("Failed to send recognized text to backend:", error);
              setMessages((prevMessages) => [
                ...prevMessages,
                { type: "bot", text: "Sorry, unable to connect to the server." },
              ]);
            }
          } else {
            console.warn("No recognized text to process.");
          }
        } else {
          console.error(
            "Recognition failed. Reason:",
            result.reason,
            "Error Details:",
            result.errorDetails
          );
        }
  
        // recognizer.close();
        // recognizerRef.current = null;
        if (onComplete) onComplete();
        setIsListening(false);
        startListeningForKeyword(); // Restart keyword detection
      },
      (err) => {
        console.error("Recognition failed:", err);
        // recognizer.close();
        // recognizerRef.current = null;
        startListeningForKeyword(); // Restart keyword detection
      }
    );
  }

  const chineseToArabic = (text) => {
    const map = {
      零: 0,
      一: 1,
      两: 2,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9,
      十: 10,
      百: 100,
      千: 1000,
    };
  
    if (!text) return null;
  
    let result = 0;
    let temp = 0; // Temp variable to hold the value of the current number segment
    let multiplier = 1; // To handle cases like 百, 千
  
    for (const char of text) {
      if (map[char] !== undefined) {
        const value = map[char];
  
        if (value === 10 || value === 100 || value === 1000) {
          if (temp === 0) temp = 1; // Handle cases like 十 (10), 百 (100)
          multiplier = value;
          result += temp * multiplier;
          temp = 0; // Reset temp for the next segment
          multiplier = 1; // Reset multiplier
        } else {
          temp = temp * 10 + value; // For sequential digits like 一二三 -> 123
        }
      } else {
        console.warn(`Invalid character: ${char}`);
      }
    }
  
    result += temp; // Add any remaining value in temp
    return result;
  };
  
  const handleCommands = (intent, parameters = {}) => {
    console.log("处理意图:", intent, "参数:", parameters);
  
    switch (intent) {

      case "跳转第一个页面":
        navigate("/planning");
        break;
  
      case "跳转第三个页面":
        navigate("/evaluate");
        break;

      case "设置时长":
        // 设置计时器时长
        const { time } = parameters;
        if (time) {
          setActiveTab("timer");
          setTime(parseInt(time, 10));
          setSecondsLeft(parseInt(time, 10) * 60);
          console.log(`计时器已设置为 ${time} 分钟`);
        } else {
          console.warn("未提供时间参数。");
        }
        break;
  
      case "开始计时":
        setActiveTab("timer");
        handleStart(); // 开始计时器
        break;
  
      case "暂停计时":
        setActiveTab("timer");
        handlePause(); // 暂停计时器
        break;
  
      case "恢复计时":
        setActiveTab("timer");
        handlePause(); // 恢复计时器 (同暂停计时器切换)
        break;
  
      case "重置计时":
        setActiveTab("timer");
        handleCancel(); // 重置计时器
        break;
  
      case "增加计时":
        setActiveTab("timer");
        const { time: increaseTime } = parameters;
        if (increaseTime) {
          setTime((prevTime) => prevTime + parseInt(increaseTime, 10));
          setSecondsLeft((prevSeconds) => prevSeconds + parseInt(increaseTime, 10) * 60);
          console.log(`计时器增加了 ${increaseTime} 分钟`);
        } else {
          console.warn("未提供时间参数。");
        }
        break;
  
      case "减少计时":
        setActiveTab("timer");
        const { time: decreaseTime } = parameters;
        if (decreaseTime) {
          setTime((prevTime) => Math.max(0, prevTime - parseInt(decreaseTime, 10)));
          setSecondsLeft((prevSeconds) => Math.max(0, prevSeconds - parseInt(decreaseTime, 10) * 60));
          console.log(`计时器减少了 ${decreaseTime} 分钟`);
        } else {
          console.warn("未提供时间参数。");
        }
        break;
  
      case "去皮":
        // TODO: 调秤
        setActiveTab("foodScale");
        
        // console.log("秤已归零");
        break;
  
      case "回到上一步":
        setActiveTab("foodScale");
        changeText(-1); // 回到上一步
        break;
  
      case "回到下一步":
        setActiveTab("foodScale");
        changeText(1); // 回到下一步
        break;
  
      case "步骤跳转":
        const { step } = parameters;
        if (step) {
          setActiveTab("foodScale");
          
          setCurrentText(parseInt(step, 10) - 1); // 跳转到指定步骤
          console.log(`跳转到步骤 ${step}`);
        } else {
          console.warn("未提供步骤参数。");
        }
        break;
  
      case "称量低筋面粉":
        saveActual();
        setActiveTab("foodScale");
        setCurrentItem(3);
        console.log("记录低筋面粉的重量");
        break;
  
      case "增加低筋面粉":
      case "减少低筋面粉":
        setActiveTab("foodScale");
        adjustWeight("flour", intent, parameters);
        break;
  
      case "称量黄油":
        saveActual();
        console.log(activeTab);
        setActiveTab("foodScale");
        setCurrentItem(0);
        console.log("记录黄油的重量");
        break;
  
      case "增加黄油":
      case "减少黄油":
        setActiveTab("foodScale");
        adjustWeight("butter", intent, parameters);
        break;
  
      case "称量白砂糖":
        saveActual();
        setActiveTab("foodScale");
        setCurrentItem(1);
        console.log("记录白砂糖的重量");
        break;
  
      case "增加白砂糖":
      case "减少白砂糖":
        setActiveTab("foodScale");
        adjustWeight("sugar", intent, parameters);
        break;
  
      case "称量蛋白液":
        saveActual();
        setActiveTab("foodScale");
        setCurrentItem(2);
        console.log("记录蛋白液的重量");
        break;
  
      case "增加蛋白液":
      case "减少蛋白液":
        setActiveTab("foodScale");
        adjustWeight("liquid", intent, parameters);
        break;
  
      case "称量蔓越莓干":
        saveActual();
        setActiveTab("foodScale");
        setCurrentItem(4);
        console.log("记录蔓越莓干的重量");
        break;
  
      case "增加蔓越莓干":
      case "减少蔓越莓干":
        setActiveTab("foodScale");
        adjustWeight("berry", intent, parameters);
        break;
  
      default:
        console.warn(`收到未知意图: ${intent}`);
    }
  };

  useEffect(() => {
    console.log("activeTab changed to:", activeTab);
  }, [activeTab]);
  
  // Helper function to adjust weights
  const adjustWeight = (type, intent, parameters) => {
    const { weight } = parameters;
    if (weight) {
      const weightValue = parseInt(weight, 10);
      const adjustment = intent.startsWith("增加") ? weightValue : -weightValue;
  
      switch (type) {
        case "flour":
          setActualFlour((prev) => Math.max(0, prev + adjustment));
          break;
        case "butter":
          setActualOil((prev) => Math.max(0, prev + adjustment));
          break;
        case "sugar":
          setActualSugar((prev) => Math.max(0, prev + adjustment));
          break;
        case "liquid":
          setActualLiquid((prev) => Math.max(0, prev + adjustment));
          break;
        case "berry":
          setActualBerry((prev) => Math.max(0, prev + adjustment));
          break;
        default:
          console.warn(`未知重量调整类型: ${type}`);
      }
  
      console.log(`已${intent.startsWith("增加") ? "增加" : "减少"}${weightValue}克 ${type}`);
    } else {
      console.warn("未提供重量参数。");
    }
  };
  
  const messagesEndRef = useRef(null);

  const checkMicrophonePermissions = async () => {
    const permissionStatus = await navigator.permissions.query({ name: "microphone" });
  
    console.log("Microphone permission state:", permissionStatus.state);
  
    if (permissionStatus.state === "denied") {
      alert("Microphone access is denied. Please enable it in your browser settings.");
    }
  
    if (permissionStatus.state === "prompt") {
      alert(
        "Microphone access is required for voice recognition. Please allow it in the upcoming browser prompt."
      );
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access granted.");
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    }
  };

  const audioContextRef = useRef(null);

  const ensureAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  
    if (audioContextRef.current.state === "suspended") {
      try {
        await audioContextRef.current.resume();
        console.log("AudioContext resumed.");
      } catch (error) {
        console.error("Error resuming AudioContext:", error);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const navigate = useNavigate();
  const handleEvaluate = async (e) => {
    e.preventDefault();
    await uploadActualAmount();
    navigate("/evaluate");
  }
  const handleAdjust = (e) => {
    e.preventDefault();
    navigate("/planning");
  }

  const uploadActualAmount = async () => {
    const actualAmounts = {
      oil: actualOil,
      flour: actualFlour,
      sugar: actualSugar,
      liquid: actualLiquid,
      berry: actualBerry,
    };

    try {
      const response = await fetch(`${url}/save-actual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid.current,
          actualAmounts,
        }),
      });
  
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }

  return (
    <div className="my-container2">
      <div className="flex-row justify-end page">
        <img className="image1" src={logo} alt="" />
        <div className="self-center section"></div>
        <span className="self-start font text">蔓越莓饼干</span>
        <div className="self-center section"></div>
        <span className="self-start font text_2">用户{uid.current}</span>
      </div>
      {/* <!-- 文本切换 --> */}
      <div className="container">
        <div className="text-container">
          <div className="button" onClick={() => changeText(-1)}>
            {"<"}
          </div>
          <div id="text-box-1" className="text-box1">
            {textsBox1[currentText]}
          </div>
          <div className="button" onClick={() => changeText(1)}>
            {">"}
          </div>
        </div>
        <div id="text-box-2" className="text-box2">
          {textsBox2[currentText]}
        </div>
      </div>
      <div className="page2">
        <img src={adjustIcon} className="image2" alt="" onClick={handleAdjust}/>
        <img src={assistIcon} className="image3" alt="" />
        <img src={evaluateIcon} className="image4" alt="" onClick={handleEvaluate}/>
        <img src={finishIcon} className="image5" alt="" onClick={handleEvaluate}/>
        <img src={helpIcon} className="image6" alt="" />
      </div>

      {/* <!-- 称量组 --> */}
      <div className="container-1">
        <div className="tab-header">
          <div
            id="foodScaleTab"
            className={activeTab === "foodScale" ? "active" : ""}
            onClick={() => setActiveTab("foodScale")}
          >
            食品称
          </div>
          <div
            id="timerTab"
            className={activeTab === "timer" ? "active" : ""}
            onClick={() => setActiveTab("timer")}
          >
            计时器
          </div>
        </div>
        <div
          id="foodScaleContent"
          className={`content ${activeTab === "foodScale" ? "active" : ""}`}
        >
          {/* <!-- 这里放置食品称的具体功能 --> */}
          <div className="food-scale">
            <div className="controls">
              <button
                id="prevBtn"
                className="button1"
                onClick={() => updateContent(currentItem - 1)}
              >
                ◀
              </button>
              <div id="textBox" className="text1">
                {items[currentItem].text}
              </div>
              <button
                id="nextBtn"
                className="button2"
                onClick={() => updateContent(currentItem + 1)}
              >
                ▶
              </button>
            </div>
            <div className="image-container">
              <img
                id="image"
                src={items[currentItem].image}
                alt="Food"
                className="image7"
              />
            </div>
            <div className="numbers">
              <span className="large" id="largeNumber" readOnly>
                {items[currentItem].largeNumber}
              </span>
              <span className="small" id="smallNumber">
                /{items[currentItem].smallNumber}g
              </span>
            </div>

            {/* <!-- 称量进度条 --> */}
            <div className="container-4">
              <div className="progress-container" id="progressContainer">
                <div
                  className="progress-bar"
                  id="progressBar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* <!-- 食品称量显示 --> */}
            <div className="container-3">
              <div className="table">
                {/* <!-- 表头 --> */}
                <div className="header-1">食材</div>
                <div className="header-2">参考量</div>
                <div className="header-3">实际量</div>

                {/* <!-- 列表内容 --> */}
                <div className="food">黄油</div>
                <div className="number-reference">{oil}</div>
                <div className="actual-quantity">
                  <button
                    className="btn-1"
                    onClick={() => changeQuantity(setActualOil, actualOil, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={actualOil}
                    min="0"
                  />
                  <button
                    className="btn-2"
                    onClick={() => changeQuantity(setActualOil, actualOil, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="food">细砂糖</div>
                <div className="number-reference">{sugar}</div>
                <div className="actual-quantity">
                  <button
                    className="btn-1"
                    onClick={() =>
                      changeQuantity(setActualSugar, actualSugar, -1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={actualSugar}
                    min="0"
                  />
                  <button
                    className="btn-2"
                    onClick={() =>
                      changeQuantity(setActualSugar, actualSugar, 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="food">蛋白液</div>
                <div className="number-reference">{liquid}</div>
                <div className="actual-quantity">
                  <button
                    className="btn-1"
                    onClick={() =>
                      changeQuantity(setActualLiquid, actualLiquid, -1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={actualLiquid}
                    min="0"
                  />
                  <button
                    className="btn-2"
                    onClick={() =>
                      changeQuantity(setActualLiquid, actualLiquid, 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="food">低筋面粉</div>
                <div className="number-reference">{flour}</div>
                <div className="actual-quantity">
                  <button
                    className="btn-1"
                    onClick={() =>
                      changeQuantity(setActualFlour, actualFlour, -1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={actualFlour}
                    min="0"
                  />
                  <button
                    className="btn-2"
                    onClick={() =>
                      changeQuantity(setActualFlour, actualFlour, 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="food">蔓越莓干</div>
                <div className="number-reference">{berry}</div>
                <div className="actual-quantity">
                  <button
                    className="btn-1"
                    onClick={() =>
                      changeQuantity(setActualBerry, actualBerry, -1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={actualBerry}
                    min="0"
                  />
                  <button
                    className="btn-2"
                    onClick={() =>
                      changeQuantity(setActualBerry, actualBerry, 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="header-4">总计</div>
                <div className="number-reference">{sum}</div>
                <div className="actual-quantity-1">
                  <input
                    type="number"
                    className="quantity-input"
                    id="totalQuantity"
                    value={actualSum}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="timerContent"
          className={`content ${activeTab === "timer" ? "active" : ""}`}
        >
          {/* <!-- 这里放置计时器的具体功能 --> */}
          <div className="timer-container">
            <div
              className="timer-circle"
              style={{
                width: isCounting ? "200px" : "120px",
                height: isCounting ? "200px" : "120px",
              }}
            >
              <button
                className="timer-button-de"
                onClick={handleDecrease}
                disabled={isCounting}
              >
                -
              </button>
              <div className="time-display">{formatTime()}</div>
              <button
                className="timer-button-in"
                onClick={handleIncrease}
                disabled={isCounting}
              >
                +
              </button>
            </div>
            <div className="time-label">分钟</div>
            {!isCounting && (
              <button className="start-button" onClick={handleStart}>
                开始计时
              </button>
            )}
            {isCounting && (
              <>
                <button className="pause-button" onClick={handlePause}>
                  {isPaused ? "继续" : "暂停"}
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  取消
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <!-- 语音助手界面 --> */}
      
      {!showChat ? (
        <div className="container-6">
        <div className="speech-bubble">
          您好，我是您的烘焙助手“Yummy（呀咪）”。<br></br>
          您可以随时呼唤“Yummy”，向我提问，和我聊一聊您烘焙遇到的问题，我会向您提供文字、语音、图片、视频等提示。我也可以帮助您在双手占用的情况下进行一些简单的界面操作。
          <br></br>
          我们一起开始吧！（确认请说：你好，Yummy）
          <img
          src={robot}
          alt="Assistant"
          className="assistant-image"
          id="assistantImage"
          onClick={toggleChatShow}
        />
        </div>
        <div className="chat-footer-before">
        <div className="recognition-status-before" onClick={toggleChatShow}>
        请先点击此处后与我交流
      </div>
        <img className="image_3" src={ButtonImage} alt="Button Icon" onClick={toggleChatShow}/>
        </div>
        </div>
      ):(
        // <div className="chat-container">
      <div className="container-6">
      <div className="chat-container">
      <div className="chat-header">
        <img
          src={RobotImage} // 聊天机器人头像URL
          alt="Bot Avatar"
          className="bot-avatar"
        />
        <span>Yummy</span>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.type === "bot" ? "bot-message" : "user-message"
            }`}
          >
            {message.type === "bot" && (
              <img
                src={RobotImage}
                alt="Bot Avatar"
                className="small-avatar"
              />
            )}
            <span>{message.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-footer">
      <p className="recognition-status">
        {isListening
          ? "Listening..."
          : "请说'Hey Yummy'"}
      </p>
        <img className="image_3" src={ButtonImage} alt="Button Icon" />
      </div>
      </div>
    </div>
      )}
    </div>
  );
};

export default Group2;
