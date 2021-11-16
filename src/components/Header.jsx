import React from "react";
import "./styling/Header.css";
import logo from "./images/logo.jpg";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
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
        />
        <SearchIcon className="header__searchIcon" fontSize="large" />
      </div>
      {/* search bar ends*/}
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello Guest, </span>
          <span className="header__optionLineTwo">Sign In</span>
        </div>
        <ShoppingCartIcon className="header__cart" />
      </div>
    </div>
  );
}

export default Header;
