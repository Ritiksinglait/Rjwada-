import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-contact-wrapper">
        <h3 style={{ color: "white" }}>Company</h3>
        <ul className="list-footer"
          style={{ listStyle: "none", margin: "2px -40px", lineHeight: "30px" }}
        >
          <li className="li-footer">
            <a href="" className="footer-list-item">
              About us
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Team
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Career
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Blogs
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Contact us
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-vertical1"></div>
      <div className="footer-connect-wrapper">
        <h3 style={{ color: "white" }}>Connect with Us</h3>
        <ul className="list-footer"
          style={{ listStyle: "none", margin: "2px -40px", lineHeight: "30px" }}
        >
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Instagram
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Linkedin
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Twitter
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-vertical2"></div>
      <div className="footer-help-wrapper">
        <h3 style={{ color: "white" }}>Help</h3>
        <ul className="list-footer"
          style={{ listStyle: "none", margin: "2px -40px", lineHeight: "30px" }}
        >
          <li className="li-footer">
            <a href="" className="footer-list-item">
              My Orders
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              FAQs
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Shipping
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Payments
            </a>
          </li>
          <li className="li-footer">
            <a href="" className="footer-list-item">
              Refund and Cancellation
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-vertical3"></div>
      <div className="footer-office-wrapper">
        <h3 style={{ color: "white" }}>Office Address</h3>
        <ul className="list-footer"
          style={{ listStyle: "none", margin: "2px -40px", lineHeight: "30px" }}
        >
          <li className="footer-list-item" style={{lineHeight: "30px"}}>
            Office address:
            <br/> Research and Innovation park, IIT Delhi
            <br/> New Delhi,110016
            <br/>
            <a href="" className="footer-list-item" >
              Rjwada@gmail.com
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-horizontal"></div>
    </div>
  );
};

export default Footer;