import { green, red, yellow } from "@material-ui/core/colors";
import "./styling/Login.css";
import React, { useState } from "react";
import axios from "axios";
class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    cnic: "",
    address: "",
    city: "",
    state: "",
    firstName: "",
    lastName: "",
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password,
      confirmPassword,
      phone,
      cnic,
      address,
      city,
      state,
      firstName,
      lastName,
    } = this.state;

    const userDetails = {
      email,
      password,
      confirmPassword,
      phone,
      cnic,
      address,
      city,
      state,
      firstName,
      lastName,
    };

    axios
      .post("http://localhost:3001/register", userDetails)
      .then(() => console.log("User created"))
      .catch((err) => {
        console.error(err);
      });
  };

  setEmail = (e) => {
    if (e.target == undefined) {
      return;
    }

    if (RegExp("/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/").test(e)) {
      return true;
    } else {
      return false;
    }
  };

  setPassword = (e) => {
    const strongRegex = new RegExp(
      "^(?=.*[a.z])(?=.*[A.Z])(?=.*[0-9])(?=.*[!@#^&*])(?=.{8,})"
    );
    const mediumRegex = new RegExp(
      "^(((?=.*[a.z])(?=.*[A.Z]))|((?=.*[0-9])(?=.*[A.Z]))|((?=.*[A.Z])(?=.*[a.z])))(?=.{6,})"
    );

    if (strongRegex.test(e.target?.value)) {
      e.target.style.background = green;
      //UNCOMMENT WHEN LEARNT HOW TO RENDER
    } else if (mediumRegex.test(e.target?.value)) {
      e.target.style.background = yellow;
    } else {
      e.target.style.background = red;
    }

    if (e.length < 8) {
      return false;
    } else {
      this.state.password = e.target?.value;
      return true;
    }
  };

  setConfirmPassword = (e) => {
    this.state.confirmPassword = e;
  };

  setAddress = (e) => {
    this.state.address = e;
  };

  setPhone = (e) => {
    this.state.phone = e;
  };
  setCity = (e) => {
    this.state.city = e;
  };
  setFirstName = (e) => {
    this.state.firstName = e;
  };
  setLastName = (e) => {
    this.state.lastName = e;
  };
  setCnic = (e) => {
    this.state.cnic = e;
  };

  setState = (e) => {
    this.state.state = e;
  };

  CheckPassword = (p1) => {
    this.setConfirmPassword(p1.target?.value);
    if (this.state.confirmPassword != this.state.password) return false;
    else return true;
  };
  render() {
    return (
      <div class="signup">
        <h2>SIGN UP</h2>
        <form class="signup__form">
          {" "}
          {/*Action will be used here to send the data*/}
          <label for="email">EMAIL</label>
          <input
            type="text"
            id="email"
            name="email"
            value={this.state.email}
            onChange={(e) => this.setEmail(e.target.value)}
            placeholder="example123@gmail.com"
            required
          />
          <label for="password">PASSWORD</label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={(e) => this.setPassword(e)}
            placeholder="Min. 8 characters"
            value={this.state.password}
            required
          />
          <label for="cpassword">CONFIRM PASSWORD</label>
          <input
            type="text"
            id="cpassword"
            name="cpassword"
            onChange={(e) => this.CheckPassword(e)}
            value={this.state.confirmPassword}
            required
          />
          <label for="fname">FIRST NAME</label>
          <input
            type="text"
            id="fname"
            name="fname"
            required
            onChange={(e) => this.setFirstName(e.target.value)}
          />
          <label for="lname">LAST NAME</label>
          <input
            type="text"
            id="lname"
            name="lname"
            required
            onChange={(e) => this.setLastName(e.target.value)}
          />
          <label for="state">STATE</label>
          <input
            type="text"
            id="lname"
            name="state"
            required
            onChange={(e) => this.setState(e.target.value)}
          />
          <label for="phone">PHONE</label>
          <input
            type="text"
            id="lname"
            name="phone"
            required
            onChange={(e) => this.setPhone(e.target.value)}
          />
          <label for="cnic">CNIC</label>
          <input
            type="text"
            id="lname"
            name="cnic"
            required
            onChange={(e) => this.setCnic(e.target.value)}
          />
          <label for="city">CITY</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            onChange={(e) => this.setCity(e.target.value)}
          />
          <label for="address">BILLING ADDRESS</label>
          <input
            type="text"
            id="address"
            name="address"
            required
            onChange={(e) => this.setAddress(e.target.value)}
          />
          {/*We can put checks on password later like min. 8 words if we have time*/}
          <input
            type="Submit"
            value="CREATE AN ACCOUNT!"
            class="signup__button"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Signup;
