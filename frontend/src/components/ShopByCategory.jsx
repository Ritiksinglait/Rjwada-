import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../config/Config";
import "./ShopByCategory.css";
import { useNavigate } from "react-router-dom";
import App from "../App";
import ParticularCategory from "../pages/ParticularCategory";
import ParticularProduct from "../pages/ParticularProduct";

// fetch('http://api.rjwada.com/items/categories')

const ShopByCategory = (props) => {
  const navigate = useNavigate;
  
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://api.rjwada.com/items/category")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualdata) => {
        setData(actualdata.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="bycategory">
      <div className="title-shopby">
        <h1> {props.title} </h1>
      </div>
      <div className="shopby-products">
        {data &&
          data.map((data) =>
            props.title === "Shop By Category" ? (
              <div className="category-cards" key={data.id}>
                <Link style={{textDecoration:'none'}}
                  to={`productpage/${data.id}`}
                >
                  <div className="product-title">
                    <h1>
                      {data.category_name.length >= 25
                        ? `${data.category_name.slice(0, 5)}`
                        : data.category_name}
                    </h1>
                  </div>
                  <div className="product-wrapper">
                    <img
                      src={`http://api.rjwada.com/assets/${data.banner}`}
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="category-cards"  key={data.id}></div>
            )
          )}
      </div>
    </div>
  );
};
export default ShopByCategory;
