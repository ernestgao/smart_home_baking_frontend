import React, { useState } from "react";
import "../styles/loginPage.css";
import loginLogo from "../assets/loginlogo.png";

const LogInPage = () => {
  const url = "https://really-touching-gull.ngrok-free.app";
  const [inputUser, setInputUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUserChange = (e) => {
    setInputUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUser) {
      let logUrl = url + "/login/" + inputUser;
      const fetchData = async () => {
        try {
          const response = await fetch(logUrl, {
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
        } catch (error) {
          setError(error.message);
          console.log("error fetch:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      alert("请输入用户编号");
    }
  };
  return (
    <body>
      <img className="image" src={loginLogo} alt="logo" />
      <form class="login-form" onSubmit={handleSubmit}>
        <div class="input-group">
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
        <button type="submit" class="login-button">
          开始测试
        </button>
      </form>
      <button class="manage-button">管理</button>
    </body>
  );
};

export default LogInPage;
