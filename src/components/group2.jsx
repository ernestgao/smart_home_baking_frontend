import React, { useState, useEffect, useRef } from "react";
import "../styles/group2.scss";
import logo from "../assets/group2/BaKing.png";
import adjustIcon from "../assets/group2/调整食谱浅.png";
import assistIcon from "../assets/group2/辅助烘焙深.png";
import evaluateIcon from "../assets/group2/成果评价浅.png";
import finishIcon from "../assets/group2/完成.png";
import helpIcon from "../assets/group2/帮助.png";
import robot from "../assets/group2/机器人.png";
import butterImage from "../assets/group2/黄油.png";
import sugarImage from "../assets/group2/细砂糖.png";
import flourImage from "../assets/group2/面粉.png";
import liquidImage from "../assets/group2/蛋液.png";
import berryImage from "../assets/group2/蔓越莓.png";

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
      } catch (error) {
        setError(error.message);
        console.log("error fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
  const [currentItem, setCurrentItem] = useState(0);
  const items = [
    {
      text: "黄油",
      image: butterImage,
      largeNumber: actualOil,
      smallNumber: oil,
    },
    {
      text: "细砂糖",
      image: sugarImage,
      largeNumber: actualSugar,
      smallNumber: sugar,
    },
    {
      text: "蛋白液",
      image: liquidImage,
      largeNumber: actualLiquid,
      smallNumber: liquid,
    },
    {
      text: "低筋面粉",
      image: flourImage,
      largeNumber: actualFlour,
      smallNumber: flour,
    },
    {
      text: "蔓越莓干",
      image: berryImage,
      largeNumber: actualBerry,
      smallNumber: berry,
    },
  ];
  const updateContent = (index) => {
    if (index < 0) {
      setCurrentItem(items.length - 1);
    } else if (index >= items.length) {
      setCurrentItem(0);
    } else {
      setCurrentItem(index);
    }
  };
  const progressPercentage =
    (parseInt(currentItem.largeNumber, 10) /
      parseInt(currentItem.smallNumber, 10)) *
    100;
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
        <img src={adjustIcon} className="image2" alt="" />
        <img src={assistIcon} className="image3" alt="" />
        <img src={evaluateIcon} className="image4" alt="" />
        <img src={finishIcon} className="image5" alt="" />
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
              <span className="large" id="largeNumber">
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
                    class="btn-2"
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
                className="timer-button"
                onClick={handleDecrease}
                disabled={isCounting}
              >
                -
              </button>
              <div className="time-display">{formatTime()}</div>
              <button
                className="timer-button"
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
      <div className="container-6">
        <div className="speech-bubble">
          您好，我是您的烘焙助手“Yummy（呀咪）”。<br></br>
          您可以随时呼唤“Yummy”，向我提问，和我聊一聊您烘焙遇到的问题，我会向您提供文字、语音、图片、视频等提示。我也可以帮助您在双手占用的情况下进行一些简单的界面操作。
          <br></br>
          我们一起开始吧！（确认请说：你好，Yummy）
        </div>
        <img
          src={robot}
          alt="Assistant"
          className="assistant-image"
          id="assistantImage"
        />
        {/* <audio id="assistantAudio" src="path_to_audio/audio.mp3"></audio> */}
      </div>
    </div>
  );
};

export default Group2;
