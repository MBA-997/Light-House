import React from "react";
import "./styling/Footer.css";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__lineOne">
        <div className="Footer__cards">
          <h5>Socials</h5>
          <ul>
            <li>
              <a href="https://www.facebook.com/">
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/?lang=en">
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com">
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>
        <div className="Footer__cards">
          <h5>Links</h5>
          <ul>
            <li>
              <a href="123">Contact us</a>
            </li>
            <li>
              <a href="123">Return Policy</a>
            </li>
            <li>
              <a href="123">FAQ</a>
            </li>
            <li>
              <a href="123">About Us</a>
            </li>
          </ul>
        </div>
        <div className="Footer__cards">
          <h5>Customer Service</h5>
          <ul>
            <li>
              <a href="123">Your Orders</a>
            </li>
            <li>
              <a href="123">Login</a>
            </li>
            <li>
              <a href="123">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="Footer__lineTwo">
        <p className="Footer__final">
          &copy; LightHouse - All Rights Preserved 2020-2021
        </p>
      </div>
    </div>
  );
}

export default Footer;
