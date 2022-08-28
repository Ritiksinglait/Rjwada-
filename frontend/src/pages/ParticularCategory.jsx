import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Toplist from "../components/Toplist";
import { Link, useParams } from "react-router-dom";
import Banner from "../components/Banner";
import "../pages/ParticularCategory.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
} from "@mui/material";
import { auth, fs } from "../config/Config";
import ParticularProduct from "../pages/ParticularProduct";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import CircleIcon from "@mui/icons-material/Circle";
import Footer from "../components/Footer";
import { Box } from "@mui/system";

import Menu from "../components/menu";

const ParticularCategory = ({ addToCart }) => {
      






  function Getcurrentuser() {
    const [user, setuser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setuser(snapshot.data().Fullname);
              console.log(snapshot.data().Fullname);
            });
        } else {
          setuser(null);
        }
      });
    }, []);
    return user;
  }

  //changes 
  






  const { category_id } = useParams();
  const user = Getcurrentuser();
  const [data, setData] = useState(null);
  console.log(category_id);
  useEffect(() => {
     fetch("http://api.rjwada.com/items/products")
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

  const [cate, setCate] = useState(null);
  useEffect(() => {
    fetch("http://api.rjwada.com/items/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualdata) => {
        setCate(actualdata.data);
        console.log(actualdata.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // changed by me 
  const filterItem=(categItem)=>{
    const updatedItem = data.filter((curElem) =>{
      return curElem.name === categItem;
    });
    console.log(updatedItem)
    setData(updatedItem);
  }
 
 


  return (
    <div>
      <Navbar user={user} />
      <Toplist />

      <div className="category-page-wrapper">
        <div className="category-filter-wrapper">
          <div
            className="filter-btn"
            style={{ padding: "10px 20px" }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <FilterListIcon style={{ marginLeft: "-10px", marginRight:"5px" }} />
            Filters
          </div>
          <Drawer className="box-drawer"
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box className="box-drawer-box" p={2} width="300px" role="presentation">
              <div className="category-filter-header">
                <h2 className="category-filter-heading">Filters</h2>
                <hr />
              </div>
              <div className="category-filter-list">
                <div className="filter-list-accordion">
                  <Accordion
                    defaultExpanded={true}
                    className="filter-list-accordion-main"
                    style={{ margin: "10px" }}
                  >
                    <AccordionSummary
                      id="panel1-header"
                      className="filter-list-accordion-header"
                      expandIcon={<ExpandMoreIcon />}
                      defaultExpanded={true}
                    >
                      <div className="accordion-heading">Style Type</div>
                    </AccordionSummary>
                    <AccordionDetails className="filter-list-accordion-detail">
                      <div className="filter-list-container">
                        <div className="filter-list-form-container">
                          <div className="filter-list-checkbox-container">
                            {cate &&
                              cate.map((data) => (
                                <>
                                  <input
                                    id={`${data.name}`}
                                    onChange={() => filterItem(data.name)} // changed by ritik
                                    className="filter-list-input"
                                    type="checkbox"
                                    value="data.name"
                                    
                                  />
                                  <label
                                    className="filter-list-checkbox"
                                    for={`${data.name}`}
                                  >
                                    {data.name}
                                  </label>
                                  <br />
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div className="filter-list-accordion">
                  <Accordion
                    className="filter-list-accordion-main"
                    style={{ margin: "10px" }}
                    defaultExpanded={true}
                  >
                    <AccordionSummary
                      id="panel1-header"
                      className="filter-list-accordion-header"
                      defaultExpanded={true}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <div className="accordion-heading">Size</div>
                    </AccordionSummary>
                    <AccordionDetails className="filter-list-accordion-detail">
                      <div className="filter-list-container">
                        <div className="filter-list-form-container">
                          <div className="filter-list-checkbox-container">
                            {data &&
                              data[0].sizes.map((data) => (
                                <>
                                  <input
                                    className="filter-list-input"
                                    type="checkbox"
                                    id={`${data}`}
                                  />
                                  <label
                                    className="filter-list-checkbox"
                                    for={`${data}`}
                                  >
                                    {data}
                                  </label>
                                  <br />
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    className="filter-list-accordion-main"
                    style={{ margin: "10px" }}
                    defaultExpanded={true}
                  >
                    <AccordionSummary
                      id="panel1-header"
                      className="filter-list-accordion-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <div className="accordion-heading">Color</div>
                    </AccordionSummary>
                    <AccordionDetails className="filter-list-accordion-detail">
                      <div className="filter-list-container">
                        <div className="filter-list-form-container">
                          <div className="filter-list-checkbox-container">
                            {data &&
                              data[0].colours.map((data) => (
                                <>
                                  <input
                                    className="filter-list-input"
                                    type="checkbox"
                                    id={`${data}`}
                                  />
                                  <label
                                    className="filter-list-checkbox"
                                    for={`${data}`}
                                  >
                                    {data}
                                  </label>
                                  <br />
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </Box>
          </Drawer>
        </div>

        <div className="category-main-wrapper">
          <div className="category-main-header">
            {/* <div
              className="category-show-pages"
              style={{ color: "#999999", fontSize: "14px" }}
            >
              Showing
              <span style={{ margin: "0px 3px" }} className="cat-page-first">
                2
              </span>
              out of
              <span style={{ margin: "0px 3px" }} className="cat-page-second">
                8
              </span>
            </div> */}
            {/* <div
              className="category-sort-box"
              style={{
                fontSize: "14px",
                border: "1px solid black",
                padding: "2px 4px",
              }}
            >
              Sort By :
              <select
                name="category-sort"
                id="category-sort"
                className="category-sort"
              >
                <option className="category-sort-option" value="relevance">
                  Relevance
                </option>
                <option className="category-sort-option" value="lowtohigh">
                  Low to High
                </option>
                <option className="category-sort-option" value="hightolow">
                  High to Low
                </option>
                <option value="newestfirst">Newest First</option>
              </select>
            </div> */}
          </div>

          <div className="category-main-grid-wrapper">
            {/* <div className="shopby-products">
            {data &&
              data.map((data) =>
                data.category_id == category_id ? (
                  <Link to={`${data.id}`}>
                    <div style={{ border: "1px solid red" }}>
                      matched categories = data cate :{data.category_id}
                      category_id: {category_id}
                      <div className="product-wrapper">
                        <img
                          src={`http://api.rjwada.com/assets/${data.banner}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                ) : null
              )}
          </div> */}
            <br />
            {/* Productpage {id} */}
            <div className="shopby-products">
              {data &&
                data.map((data) =>
                  data.category_id == category_id ? (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`${data.id}`}
                      onClick={() => {
                        <ParticularProduct cat_id={data.category_id} />;
                      }}
                    >
                      <div
                        style={{
                          // border: "1px solid red",
                          boxShadow: "0px 0px 3px black",
                          overflow: "hidden",
                          lineHeight: "1.4rem",
                          textDecoration: "none",
                          width: "235px",
                          color: "black",
                          margin: "20px",
                        }}
                      >
                        <div
                          className="product-wrapper"
                          style={{
                            height: "200px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            width="235px"
                            src={`http://api.rjwada.com/assets/${data.banner}`}
                            alt=""
                          />
                        </div>
                        <div
                          className="details"
                          style={{
                            textDecoration: "none",
                            height: "130px",
                            padding: "7px",
                          }}
                        >
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                              color: "black",
                            }}
                          >
                            {data.name} <br />
                          </div>
                          <div style={{ fontSize: "0.9rem", padding: "2px" }}>
                            Stubborn Factory <br />
                          </div>
                          <div style={{ fontWeight: "bold" }}>
                            Rs {data.price} <br />
                          </div>
                          <div>
                            {data.colours.map((colors) => {
                              return (
                                <CircleIcon
                                  style={{
                                    border: "1px solid black",
                                    color: `${colors}`,
                                    borderRadius: "20px",
                                    fontSize: "20px",
                                  }}
                                ></CircleIcon>
                              );
                            })}
                          </div>
                          <div style={{ display: "flex" }}>
                            <div style={{ marginRight: "10px" }}>Size:</div>
                            {data.sizes.map((size) => {
                              return <div>{size}</div>;
                            })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : null
                )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ParticularCategory;