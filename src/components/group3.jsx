import React, { useState, useEffect, useRef } from "react";
import "../styles/group3.css";
import logo from "../assets/BaKing.png";
import adjustIcon from "../assets/调整食谱浅.png";
import assistIcon from "../assets/辅助烘焙浅.png";
import evaluateIcon from "../assets/成果评价深.png";
import finishIcon from "../assets/完成.png";
import finishIconSmall from "../assets/完成小.png";
import helpIcon from "../assets/帮助.png";
import defaultProduct from "../assets/实验A-3-1.png";
import photoIcon from "../assets/拍照记录.png";
import editIcon from "../assets/编辑小标.png"

const Group3 = () => {
  return (
    <div class="flex-col page">
      <div class="flex-col">
        <div class="flex-row justify-between">
          <div class="flex-row items-center relative section">
          <img className="image1" src={logo} alt="logo" />
            <div class="shrink-0 section_3 view"></div>
            <span class="font text_2">蔓越莓饼干</span>
            <div class="shrink-0 section_3 view_2"></div>
            <span class="font text_3">用户01</span>
          </div>
          <div class="section_2">
          <img className="image3" src={adjustIcon} alt="" />
          <img className="image4" src={assistIcon} alt="" />
          <img className="image5" src={evaluateIcon} alt="" />
          <img className="image6" src={finishIcon} alt="" />
          <img className="image7" src={helpIcon} alt="" />
          </div>
        </div>
        <div class="flex-row group">
          <span class="font_2 text_4">烘焙成果</span>
          <button
            className="image8"
            type="button"
            // onClick={handleReset}
            style={{ border: "none", background: "none", padding: 0 }}
          ><img src={photoIcon} alt="reset" />
          </button>
          <div class="flex-row ml-280">
            <span class="font_2 text_5">实际用量（克）</span>
            <span class="font_2 text_6 ml-175">评价</span>
          </div>
        </div>
        <div class="flex-row justify-center group_2">
          <div class="flex-col justify-start items-center relative image-wrapper">
          <img
                className="image2"
                src={defaultProduct}
                alt="default prediction"
              />
          </div>
          <div class="flex-col relative section_4 ml-19">
            <div class="flex-row items-baseline self-stretch">
              <span class="font_3 text_7">黄油</span>
              <div class="selector_1">
                <div>
                  <button onclick="decrement('quantity1')">-</button>
                  <input
                    type="number"
                    id="quantity1"
                    class="value"
                    value="110"
                  />
                  <button onclick="increment('quantity1')">+</button>
                </div>
              </div>
              <span class="font_4 text_8 ml-119">左右</span>
            </div>
            <div class="mt-24 flex-row items-baseline self-stretch">
              <span class="font_5 text_10">细砂糖</span>
              <div class="selector_2">
                <div>
                  <button onclick="decrement('quantity2')">-</button>
                  <input
                    type="number"
                    id="quantity2"
                    class="value"
                    value="80"
                  />
                  <button onclick="increment('quantity2')">+</button>
                </div>
              </div>
              <span class="font_4 text_11 ml-120">上限</span>
            </div>
            <div class="mt-24 flex-row items-baseline self-stretch">
              <span class="font_5 text_35">蛋白液</span>
              <div class="selector_3">
                <div>
                  <span id="quantity3" class="value">
                    25
                  </span>
                </div>
              </div>
              <span class="font_4 text_12 ml-120">下限</span>
            </div>
            <div class="mt-24 flex-row items-baseline self-stretch">
              <span class="font_3 text_14">低筋面粉</span>
              <div class="selector_4">
                <div>
                  <span id="quantity4" class="value">
                    185
                  </span>
                </div>
              </div>
              <span class="font_4 text_17 ml-120">上限</span>
            </div>
            <div class="mt-24 flex-row items-baseline self-stretch">
              <span class="font_3 text_18">蔓越莓干</span>
              <div class="selector_5">
                <div>
                  <span id="quantity5" class="value">
                    55
                  </span>
                </div>
              </div>
              <span class="font_4 text_19 ml-119">左右</span>
            </div>
            <span class="mt-24 self-start font_2 text_21">总计</span>
            <div class="total">
              <span id="sum" class="text_34">
                455
              </span>
            </div>
          </div>
          <div class="flex-col section_5 ml-19">
            <div class="flex-col">
              <span class="self-start font_4 text_9">甜度</span>
              <div class="slidecontainer1">
                <input
                  type="range"
                  min="1"
                  max="6"
                  value="3"
                  class="slider"
                  id="myRange"
                />
              </div>
              <div class="flex-row self-stretch group_3 mt-17">
                <span class="font_4 text_31">淡</span>
                <span class="font_4 ml-339 text_32">甜</span>
              </div>
            </div>
            <div class="mt-44 flex-col">
              <span class="self-start font_4 text_13">口感</span>
              <div class="slidecontainer2">
                <input
                  type="range"
                  min="1"
                  max="6"
                  value="3"
                  class="slider"
                  id="myRange"
                />
              </div>
              <div class="flex-row self-stretch group_4 mt-17">
                <span class="font_4 text_15">脆硬</span>
                <span class="font_4 text_16 ml-306">酥松</span>
              </div>
            </div>
            <div class="mt-44 flex-col">
              <span class="self-start font_4 text_20">奶香</span>
              <div class="slidecontainer3">
                <input
                  type="range"
                  min="1"
                  max="6"
                  value="3"
                  class="slider"
                  id="myRange"
                />
              </div>
              <div class="flex-row self-stretch group_3 mt-17">
                <span class="font_4 text_33">淡</span>
                <span class="font_4 text_22 ml-339">浓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-30 flex-col">
        <div class="flex-row justify-between">
          <span class="font_2 text_23">制作步骤</span>
          <img className="image10" src={finishIconSmall} alt="" />
          <span class="font_2 text_24">实际热量</span>
        </div>
        <div class="flex-row mt-15">
          <div class="flex-col items-start flex-1 relative section_6">
            <span class="font_3 text_25">
              <img className="image9" src={editIcon} alt="" />
              软化黄油，在黄油中加入细砂糖，搅打至黄油微微发白，得到糖油混合物。
            </span>
            <span class="font_3 text_26 mt-23">
            <img className="image9" src={editIcon} alt="" />
              在糖油混合物中加入蛋白液，搅打至完全乳化，得到混合物（A）。
            </span>
            <span class="font_3 text_28 mt-23">
            <img className="image9" src={editIcon} alt="" />
              切碎蔓越莓干，将蔓越莓干碎加入低筋面粉，充分搅拌，得到混合物（B）。
            </span>
            <span class="font_3 text_29 mt-23">
            <img className="image9" src={editIcon} alt="" />
              将（A）和（B）充分混合得到面团，将面团放入铺有保鲜膜的模具塑形。
            </span>
            <span class="font_3 mt-23">
            <img className="image9" src={editIcon} alt="" />
              将塑形后的面团放到冰箱中冷冻30分钟，面团变硬后取出，切成约0.5厘米的薄片。
            </span>
            <span class="font_3 mt-23">
            <img className="image9" src={editIcon} alt="" />
              烤箱预热，上火160度，下火150度，烘烤约20分钟后取出，静置冷却。
            </span>
          </div>
          <div class="flex-col items-center shrink-0 section_7 ml-19">
            <span class="text_27">2048</span>
            <span class="font_3 text_30 mt-31">卡路里/100克</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group3;
