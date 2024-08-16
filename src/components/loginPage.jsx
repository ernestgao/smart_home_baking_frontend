import React, { useState } from "react";
import "../styles/loginPage.css";
import loginLogo from "../assets/loginlogo.png";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const url = "https://really-touching-gull.ngrok-free.app";
  const navigate = useNavigate();
  const [inputUser, setInputUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUserChange = (e) => {
    setInputUser(e.target.value);
  };

  const handleManage = (e) => {
    e.preventDefault();
    navigate("/manage");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputUser) {
      let logUrl = url + `/login/${inputUser}`;
      try {
        console.log(inputUser);
        const response = await fetch(logUrl, {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        navigate("/planning");
      } catch (error) {
        setError(error.message);
        console.log("error fetch:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("请输入用户编号");
    }
  };

  return (
    <div>
      <img className="image" src={loginLogo} alt="logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="number"
            id="uid"
            name="uid"
            placeholder="请输入用户编号"
            value={inputUser}
            onChange={handleUserChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          开始测试
        </button>
      </form>
      <button className="manage-button" onClick={handleManage}>管理</button>
    </div>
  );
};

export default LogInPage;
