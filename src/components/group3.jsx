import React, { useState, useEffect, useRef } from "react";
import "../styles/group3.scss";
import logo from "../assets/group3/BaKing.png";
import adjustIcon from "../assets/group3/调整食谱浅.png";
import assistIcon from "../assets/group3/辅助烘焙浅.png";
import evaluateIcon from "../assets/group3/成果评价深.png";
import finishIcon from "../assets/group3/完成.png";
import finishIconSmall from "../assets/group3/完成小.png";
import helpIcon from "../assets/group3/帮助.png";
import defaultProduct from "../assets/group3/实验A-3-1.png";
import photoIcon from "../assets/group3/拍照记录.png";
import editIcon from "../assets/group3/编辑小标.png"

const Group3 = () => {
  const url = "https://really-touching-gull.ngrok-free.app";
  const uid = useRef("");
  const [inputOil, setInputOil] = useState(0);
  const [inputSugar, setInputSugar] = useState(0);
  const [inputLiquid, setOutputLiquid] = useState(0);
  const [inputFlour, setOutputFlour] = useState(0);
  const [inputBerry, setOutputBerry] = useState(0);
  const [sweetnessValue, setSweetnessValue] = useState(1);
  const [textureValue, setTextureValue] = useState(1);
  const [milkinessValue, setMilkinessValue] = useState(1);
  const [outputCalorie, setOutputCalorie] = useState(0);
  const sum = inputOil + inputSugar + inputLiquid + inputFlour + inputBerry;
  const caloriePerGram =
    sum !== 0 ? Number((100 * (outputCalorie / sum)).toFixed(2)) : 0;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleOilChange = (e) => {
    setInputOil(parseFloat(e.target.value));
  };
  const handleSugarChange = (e) => {
    setInputSugar(parseFloat(e.target.value));
  };
  const handleLiquidChange = (e) => {
    setInputSugar(parseFloat(e.target.value));
  };
  const handleFlourChange = (e) => {
    setInputSugar(parseFloat(e.target.value));
  };
  const handleBerryChange = (e) => {
    setInputSugar(parseFloat(e.target.value));
  };
  const handleOilDecrement = () => {
    setInputOil((prevOil) => Math.max(prevOil - 1, 0));
  };
  const handleOilIncrement = () => {
    setInputOil((prevOil) => prevOil + 1);
  };

  const handleSugarDecrement = () => {
    setInputSugar((prevSugar) => Math.max(prevSugar - 1, 0));
  };
  const handleSugarIncrement = () => {
    setInputSugar((prevSugar) => prevSugar + 1);
  };

  const handleLiquidDecrement = () => {
    setInputSugar((prevSugar) => Math.max(prevSugar - 1, 0));
  };
  const handleLiquidIncrement = () => {
    setInputSugar((prevSugar) => prevSugar + 1);
  };

  const handleFlourDecrement = () => {
    setInputSugar((prevSugar) => Math.max(prevSugar - 1, 0));
  };
  const handleFlourIncrement = () => {
    setInputSugar((prevSugar) => prevSugar + 1);
  };

  const handleBerryDecrement = () => {
    setInputSugar((prevSugar) => Math.max(prevSugar - 1, 0));
  };
  const handleBerryIncrement = () => {
    setInputSugar((prevSugar) => prevSugar + 1);
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
    <div className="my-container3">
    <div className="flex-col page">
  <div className="flex-col">
    <div className="flex-row justify-between">
      <div className="flex-row items-center relative section">
        <img className="image1" src={logo} alt="logo" />
        <div className="shrink-0 section_3 view"></div>
        <span className="font text_2">蔓越莓饼干</span>
        <div className="shrink-0 section_3 view_2"></div>
        <span className="font text_3">用户{uid.current}</span>
      </div>
      <div className="section_2">
        <img className="image3" src={adjustIcon} alt="" />
        <img className="image4" src={assistIcon} alt="" />
        <img className="image5" src={evaluateIcon} alt="" />
        <img className="image6" src={finishIcon} alt="" />
        <img className="image7" src={helpIcon} alt="" />
      </div>
    </div>
    <div className="flex-row group">
      <span className="font_2 text_4">烘焙成果</span>
      <button
        className="image8"
        type="button"
        // onClick -> 调用系统相机拍照
        style={{ border: "none", background: "none", padding: 0 }}
      >
        <img src={photoIcon} alt="reset" />
      </button>
      <div className="flex-row ml-280">
        <span className="font_2 text_5">实际用量（克）</span>
        <span className="font_2 text_6 ml-175">评价</span>
      </div>
    </div>
    <div className="flex-row justify-center group_2">
      <div className="flex-col justify-start items-center relative image-wrapper">
        <img
          className="image2"
          src={defaultProduct}
          alt="default prediction"
        />
      </div>
      <div className="flex-col relative section_4 ml-19">
        <div className="flex-row items-baseline self-stretch">
          <span className="font_3 text_7">黄油</span>
          <div className="selector_1">
            <div>
              <button className="yellow-button" onClick={handleOilDecrement}>-</button>
              <input
                type="number"
                id="quantity1"
                className="value"
                value="110"
                onChange={handleOilChange}
              />
              <button className="yellow-button" onClick={handleOilIncrement}>+</button>
            </div>
          </div>
          <span className="font_4 text_8 ml-119">左右</span>
        </div>
        <div className="mt-24 flex-row items-baseline self-stretch">
          <span className="font_5 text_10">细砂糖</span>
          <div className="selector_2">
            <div>
              <button className="yellow-button" onClick={handleSugarDecrement}>-</button>
              <input
                type="number"
                id="quantity2"
                className="value"
                value="80"
                onChange={handleSugarChange}
              />
              <button className="yellow-button" onClick={handleSugarIncrement}>+</button>
            </div>
          </div>
          <span className="font_4 text_11 ml-120">上限</span>
        </div>
        <div className="mt-24 flex-row items-baseline self-stretch">
          <span className="font_5 text_35">蛋白液</span>
          <div className="selector_3">
            <div>
              <button className="yellow-button" onClick={handleLiquidDecrement}>-</button>
              <input
                type="number"
                id="quantity3"
                className="value"
                value={inputLiquid}
                onChange={handleLiquidChange}
              />
              <button className="yellow-button" onClick={handleLiquidIncrement}>+</button>
            </div>
          </div>
          <span className="font_4 text_12 ml-120">下限</span>
        </div>
        <div className="mt-24 flex-row items-baseline self-stretch">
          <span className="font_3 text_14">低筋面粉</span>
          <div className="selector_4">
            <div>
              <button className="yellow-button" onClick={handleFlourDecrement}>-</button>
              <input
                type="number"
                id="quantity4"
                className="value"
                value={inputFlour}
                onChange={handleFlourChange}
              />
              <button className="yellow-button" onClick={handleFlourIncrement}>+</button>
            </div>
          </div>
          <span className="font_4 text_17 ml-120">上限</span>
        </div>
        <div className="mt-24 flex-row items-baseline self-stretch">
          <span className="font_3 text_18">蔓越莓干</span>
          <div className="selector_5">
            <div>
              <button className="yellow-button" onClick={handleBerryDecrement}>-</button>
              <input
                type="number"
                id="quantity5"
                className="value"
                value={inputBerry}
                onChange={handleBerryChange}
              />
              <button className="yellow-button" onClick={handleBerryIncrement}>+</button>
            </div>
          </div>
          <span className="font_4 text_19 ml-119">左右</span>
        </div>
        <span className="mt-24 self-start font_2 text_21">总计</span>
        <div className="total">
          <span id="sum" className="text_34">
            455
          </span>
        </div>
      </div>
      <div className="flex-col section_5 ml-19">
        <div className="flex-col">
          <span className="self-start font_4 text_9">甜度</span>
          <div className="slidecontainer1">
            <input
              type="range"
              min="1"
              max="6"
              value={sweetnessValue}
              className="slider"
              id="myRange"
            />
          </div>
          <div className="flex-row self-stretch group_3 mt-17">
            <span className="font_4 text_31">淡</span>
            <span className="font_4 ml-339 text_32">甜</span>
          </div>
        </div>
        <div className="mt-44 flex-col">
          <span className="self-start font_4 text_13">口感</span>
          <div className="slidecontainer2">
            <input
              type="range"
              min="1"
              max="6"
              value={textureValue}
              className="slider"
              id="myRange"
            />
          </div>
          <div className="flex-row self-stretch group_4 mt-17">
            <span className="font_4 text_15">脆硬</span>
            <span className="font_4 text_16 ml-306">酥松</span>
          </div>
        </div>
        <div className="mt-44 flex-col">
          <span className="self-start font_4 text_20">奶香</span>
          <div className="slidecontainer3">
            <input
              type="range"
              min="1"
              max="6"
              value={milkinessValue}
              className="slider"
              id="myRange"
            />
          </div>
          <div className="flex-row self-stretch group_3 mt-17">
            <span className="font_4 text_33">淡</span>
            <span className="font_4 text_22 ml-339">浓</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="mt-30 flex-col">
    <div className="flex-row justify-between">
      <span className="font_2 text_23">制作步骤</span>
      <img className="image10" src={finishIconSmall} alt="" />
      <span className="font_2 text_24">实际热量</span>
    </div>
    <div className="flex-row mt-15">
      <div className="flex-col items-start flex-1 relative section_6">
        <span className="font_3 text_25">
          <img className="image9" src={editIcon} alt="" />
          软化黄油，在黄油中加入细砂糖，搅打至黄油微微发白，得到糖油混合物。
        </span>
        <span className="font_3 text_26 mt-23">
          <img className="image9" src={editIcon} alt="" />
          在糖油混合物中加入蛋白液，搅打至完全乳化，得到混合物（A）。
        </span>
        <span className="font_3 text_28 mt-23">
          <img className="image9" src={editIcon} alt="" />
          切碎蔓越莓干，将蔓越莓干碎加入低筋面粉，充分搅拌，得到混合物（B）。
        </span>
        <span className="font_3 text_29 mt-23">
          <img className="image9" src={editIcon} alt="" />
          将（A）和（B）充分混合得到面团，将面团放入铺有保鲜膜的模具塑形。
        </span>
        <span className="font_3 mt-23">
          <img className="image9" src={editIcon} alt="" />
          将塑形后的面团放到冰箱中冷冻30分钟，面团变硬后取出，切成约0.5厘米的薄片。
        </span>
        <span className="font_3 mt-23">
          <img className="image9" src={editIcon} alt="" />
          烤箱预热，上火160度，下火150度，烘烤约20分钟后取出，静置冷却。
        </span>
      </div>
      <div className="flex-col items-center shrink-0 section_7 ml-19">
        <span className="text_27">{caloriePerGram}</span>
        <span className="font_3 text_30 mt-31">卡路里/100克</span>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default Group3;
