import "./styling/Login.css";
import Signup from "./Signup";
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    axios
      .post("http://localhost:3001/login", { loginData })
      .then((e) => console.log(e))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div class="login">
        <h2>LOGIN</h2>
        <form class="login__form">
          {/*Action will be used here to send the data*/}

          <label for="email">EMAIL</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example123@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label for="password">PASSWORD</label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/*We can put checks on password later like min. 8 words if we have time*/}
          <input
            type="Submit"
            value="LOGIN!"
            onClick={handleSubmit}
            class="login__button"
          />
        </form>
      </div>
      <div>
        <Signup />
      </div>
    </div>
  );
}

export default Login;
