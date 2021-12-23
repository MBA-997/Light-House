import React, { useState } from "react";
import "./styling/Header.css";
import logo from "./images/logo.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  const [product, setProduct] = useState([]);

  const findProduct = (e) => {
    e = "MUSHROOM LAMP";
    axios
      .get(`http://localhost:3001/Light/Items/:${e}`)
      .then((e) => console.log(e))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="header__body">
      <Link to="/" className="header__logoLink">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      {/* search_bar starts..*/}
      <div className="header__search">
        {/* <label for="Search"></label> */}
        <input
          type="text"
          id="Search"
          className="header__searchSpace"
          name="Search"
          placeholder="Search for a product!"
          onChange={(e) => setProduct(e.target.value)}
        />
        <SearchIcon
          className="header__searchIcon"
          fontSize="large"
          onClick={findProduct}
        />
      </div>
      {/* search bar ends*/}
      <div className="header__nav">
        <Link to="signup-login" className="header__option">
          {/* <div className="header__option"> */}
          <span className="header__optionLineOne">Hello Guest, </span>
          <span className="header__optionLineTwo">Sign In</span>
          {/* </div> */}
        </Link>
        <Link to="checkout" className="header__option">
          <ShoppingCartIcon className="header__cart" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
