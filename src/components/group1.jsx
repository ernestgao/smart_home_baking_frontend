import React, { useState, useEffect, useRef } from "react";
import "../styles/group1.css";
import logo from "../assets/BaKing.png";
import adjustIcon from "../assets/调整食谱深.png";
import assistIcon from "../assets/辅助烘焙浅.png";
import evaluateIcon from "../assets/成果评价浅.png";
import finishIcon from "../assets/完成.png";
import helpIcon from "../assets/帮助.png";
import resetIcon from "../assets/初始食谱.png";
import defaultProduct from "../assets/实验A-3-1.png";

const Group1 = () => {
  const url = "https://really-touching-gull.ngrok-free.app";
  const uid = useRef("");
  const [inputOil, setInputOil] = useState(0);
  const [inputSugar, setInputSugar] = useState(0);
  const [outputLiquid, setOutputLiquid] = useState(0);
  const [outputFlour, setOutputFlour] = useState(0);
  const [outputBerry, setOutputBerry] = useState(0);
  const [sweetnessValue, setSweetnessValue] = useState(1);
  const [textureValue, setTextureValue] = useState(1);
  const [milkinessValue, setMilkinessValue] = useState(1);
  const [outputCalorie, setOutputCalorie] = useState(0);
  const sum = inputOil + inputSugar + outputLiquid + outputFlour + outputBerry;
  const caloriePerGram =
    sum !== 0 ? Number((100 * (outputCalorie / sum)).toFixed(2)) : 0;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userChangeTaste, setUserTaste] = useState(false);
  const [userChangeAmount, setUserAmount] = useState(false);

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

  //amount part
  const handleOilChange = (e) => {
    setInputOil(parseFloat(e.target.value));
    setUserAmount(true);
  };
  const handleSugarChange = (e) => {
    setInputSugar(parseFloat(e.target.value));
    setUserAmount(true);
  };
  const handleOilDecrement = () => {
    setInputOil((prevOil) => Math.max(prevOil - 1, 0));
    setUserAmount(true);
  };
  const handleOilIncrement = () => {
    setInputOil((prevOil) => prevOil + 1);
    setUserAmount(true);
  };

  const handleSugarDecrement = () => {
    setInputSugar((prevSugar) => Math.max(prevSugar - 1, 0));
    setUserAmount(true);
  };
  const handleSugarIncrement = () => {
    setInputSugar((prevSugar) => prevSugar + 1);
    setUserAmount(true);
  };

  useEffect(() => {
    if (!userChangeAmount) return;
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url + "/modify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sugar: inputSugar,
            oil: inputOil,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        getResults(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    setUserAmount(false);
  }, [inputOil, inputSugar, userChangeAmount]);

  // taste part
  useEffect(() => {
    if (!userChangeTaste) return;
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url + "/adjust", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sweetness: sweetnessValue,
            texture: textureValue,
            milkiness: milkinessValue,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        getResults(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    setUserTaste(false);
  }, [milkinessValue, sweetnessValue, textureValue, userChangeTaste]);

  const handleTasteChange = async (e, set) => {
    const newValue = parseInt(e.target.value);
    set(newValue);
    setUserTaste(true);
  };

  // clicking
  const handleReset = (e) => {
    e.preventDefault();
    const apiUrl = url + "/plan";
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
        getResults(result);
      } catch (error) {
        setError(error.message);
        console.log("error fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const getResults = (results) => {
    let result = results.result;
    const extractedAmount = result.amount;
    const extractedTaste = result.tastes;
    const extractedCalorie = result.calorie;

    // Set the amounts
    setInputSugar(extractedAmount.sugar);
    setInputOil(extractedAmount.oil);
    setOutputLiquid(extractedAmount.liquid);
    setOutputFlour(extractedAmount.flour);
    setOutputBerry(extractedAmount.berry);
    // Set the tastes
    setSweetnessValue(extractedTaste.sweetness);
    setTextureValue(extractedTaste.texture);
    setMilkinessValue(extractedTaste.milkiness);
    // Set the calorie
    setOutputCalorie(extractedCalorie);
  };

  return (
    <div className="flex-col page">
      <div className="flex-col">
        <div className="flex-row justify-end items-center self-start section">
          <img className="image1" src={logo} alt="logo" />
          <div className="shrink-0 section_2 view"></div>
          <span className="font text">蔓越莓饼干</span>
          <div className="shrink-0 section_2 view_2"></div>
          <span className="font text_2">用户{uid.current}</span>
        </div>
        <div className="section_7">
          <img className="image3" src={adjustIcon} alt="" />
          <img className="image4" src={assistIcon} alt="" />
          <img className="image5" src={evaluateIcon} alt="" />
          <img className="image6" src={finishIcon} alt="" />
          <img className="image7" src={helpIcon} alt="" />
          <button
            className="image8"
            type="button"
            onClick={handleReset}
            style={{ border: "none", background: "none", padding: 0 }}
          >
            <img src={resetIcon} alt="reset" />
          </button>
        </div>
        <span className="self-start font_2 text_3">食谱调整（克）</span>
        <div className="flex-row justify-between self-stretch section_3">
          <div className="flex-row self-center">
            <div className="flex-row ">
              <img
                className="image2"
                src={defaultProduct}
                alt="default prediction"
              />
              <div className="flex-col items-center group ml-35 ">
                <span className="font_3 text_4">黄油</span>
                <div className="selector_1">
                  <div>
                    <button onClick={handleOilDecrement}>-</button>
                    <input
                      type="number"
                      id="quantity1"
                      className="value"
                      value={inputOil}
                      onChange={handleOilChange}
                    />
                    <button onClick={handleOilIncrement}>+</button>
                  </div>
                </div>
                <span className="mt-24 font_6 text_9">细砂糖</span>
                <div className="selector_2">
                  <div>
                    <button onClick={handleSugarDecrement}>-</button>
                    <input
                      type="number"
                      id="quantity2"
                      className="value"
                      value={inputSugar}
                      onChange={handleSugarChange}
                    />
                    <button onClick={handleSugarIncrement}>+</button>
                  </div>
                </div>
                <span className="mt-24 font_6 text_31">蛋白液</span>
                <div className="selector_3">
                  <div>
                    <span id="quantity3" className="value">
                      {outputLiquid}
                    </span>
                  </div>
                </div>
                <span className="mt-24 font_3 text_13">低筋面粉</span>
                <div className="selector_4">
                  <div>
                    <span id="quantity4" className="value">
                      {outputFlour}
                    </span>
                  </div>
                </div>
                <span className="mt-24 font_3 text_17">蔓越莓干</span>
                <div className="selector_5">
                  <div>
                    <span id="quantity5" className="value">
                      {outputBerry}
                    </span>
                  </div>
                </div>
                <span className="mt-24 font_2 text_20">总计</span>
                <div className="total">
                  <span id="sum" className="text_34">
                    {sum}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-row ml-118">
              <div className="flex-col items-center self-start group_3">
                <span className="font_4 text_5 ">左右</span>
                <span className="font_4 text_10 mt-27">上限</span>
                <span className="font_4 text_11 mt-27">下限</span>
                <span className="font_4 text_16 mt-27">上限</span>
                <span className="font_4 text_18 mt-27">左右</span>
              </div>
              <div className="ml-48 flex-col items-end group_2">
                <div className="flex-col group_4">
                  <span className="self-start font_5 text_6">甜度</span>
                  <div className="slidecontainer1">
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={sweetnessValue}
                      className="slider"
                      id="myRange"
                      onChange={(e) => handleTasteChange(e, setSweetnessValue)}
                    />
                  </div>
                  <span className="self-end font_4 text_7 mt-15">淡</span>
                </div>
                <div className="flex-col group_4 mt-39">
                  <span className="self-start font_5 text_12">口感</span>
                  <div className="slidecontainer2">
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={textureValue}
                      className="slider"
                      id="myRange"
                      onChange={(e) => handleTasteChange(e, setTextureValue)}
                    />
                  </div>
                  <span className="mt-16 self-end font_4 text_14">酥松</span>
                </div>
                <div className="flex-col group_4 mt-39">
                  <span className="self-start font_5 text_19">奶香</span>
                  <div className="slidecontainer3">
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={milkinessValue}
                      className="slider"
                      id="myRange"
                      onChange={(e) => handleTasteChange(e, setMilkinessValue)}
                    />
                  </div>
                  <span className="self-end font_4 text_21 mt-17">淡</span>
                  <div className="flex-col self-start group_5">
                    <span className="self-end font_4 text_8">甜</span>
                    <div className="flex-col items-center self-stretch group_6">
                      <div className="section_4"></div>
                      <span className="font_4 text_15 mt-21">脆硬</span>
                    </div>
                    <span className="self-end font_4 text_22">浓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32 flex-col">
        <div className="flex-row justify-between">
          <span className="font_2 text_23">制作步骤</span>
          <span className="font_2 text_24">预估热量</span>
        </div>
        <div className="flex-row mt-13">
          <div className="flex-col items-start flex-1 relative section_5">
            <span className="font_3 text_25">
              软化黄油，在黄油中加入细砂糖，搅打至黄油微微发白，得到糖油混合物。
            </span>
            <span className="font_3 text_26 mt-23">
              在糖油混合物中加入蛋白液，搅打至完全乳化，得到混合物（A）。
            </span>
            <span className="font_3 text_28 mt-23">
              切碎蔓越莓干，将蔓越莓干碎加入低筋面粉，充分搅拌，得到混合物（B）。
            </span>
            <span className="font_3 text_29 mt-23">
              将（A）和（B）充分混合得到面团，将面团放入铺有保鲜膜的模具塑形。
            </span>
            <span className="font_3 mt-23">
              将塑形后的面团放到冰箱中冷冻30分钟，面团变硬后取出，切成约0.5厘米的薄片。
            </span>
            <span className="font_3 mt-23">
              烤箱预热，上火160度，下火150度，烘烤约20分钟后取出，静置冷却。
            </span>
          </div>
          <div className="flex-col items-center shrink-0 section_6 ml-19">
            <span className="text_27">{caloriePerGram}</span>
            <span className="font_3 text_30 mt-33">卡路里/100克</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group1;
