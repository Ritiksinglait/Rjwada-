import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Toplist from "../components/Toplist";
import { Link, useParams } from "react-router-dom";
import "./ParticularProduct.css";
import Razorpay from "../components/Razorpay";
import { auth, fs } from "../config/Config";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { senddata } from "../components/send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../components/Footer";
const ParticularProduct = ({ addToCart, addToWhishlist }) => {
  const navigate = useNavigate();

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
            });
        } else {
          setuser(null);
        }
      });
    }, []);
    return user;
  }

  const user = Getcurrentuser();

  const { id } = useParams();

  const [data, setData] = useState(null);
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

  const [selectedsize, setselectedsize] = useState("L");
  const [name, setname] = useState("Product name");
  const [size, setsize] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const [productId, setproductId] = useState("");
  const [price, setprice] = useState("Product price");
  const [description, setdescription] = useState("Product description");
  const [datas, setdata] = useState({});
  const [banner, setbanner] = useState("Product img");
  useEffect(() => {
    data &&
      data.map((data) =>
        data.id == id
          ? (setdata({ data, size }),
            setname(data.name),
            setsize(data.sizes),
            setcategoryId(data.category_id),
            setproductId(data.id),
            setprice(data.price),
            setdescription(data.description),
            setbanner(data.banner))
          : null
      );
  }, [data]);
  datas["categoryId"] = categoryId;
  console.log(selectedsize);

  let quantity = 1;

  console.log(categoryId);
  let tosend = {};
  tosend["userId"] = localStorage.getItem("uid");
  tosend["selectedsize"] = selectedsize;
  tosend["name"] = name;
  tosend["quantity"] = quantity;
  tosend["size"] = size;
  tosend["categoryId"] = categoryId;
  tosend["productId"] = productId;
  tosend["price"] = price;
  tosend["description"] = description;
  tosend["banner"] = banner;

  console.log(tosend);
  console.log(localStorage.getItem("uid"));

  useEffect(() => {
    if (localStorage.getItem("paymentdone") === true) {
      console.log("paymentdone");
      senddata(tosend);
      localStorage.setItem("paymentdone", false);
    } else {
      localStorage.setItem("paymentdone", false);
    }
  }, []);
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <Navbar user={user} />
      <Toplist />
      <div className="part-product-wrapper">
        <div className="section-one">
          <div className="product-image-section">
            <div className="slider-section">
              {/* <div className="vertical-slider">
                <div className="vertical-slider-item">
                  <img src="" alt="illus-item" />
                </div>
                <div className="vertical-slider-item">
                  <img src="" alt="illus-item" />
                </div>
                <div className="vertical-slider-item">
                  <img src="" alt="illus-item" />
                </div>
                <div className="vertical-slider-item">
                  <img src="" alt="illus-item" />
                </div>
              </div> */}
              <div className="product-preview-section">
                <div className="product-image-slider">
                  {/* image fetch start */}
                  <img
                    className="particular-productimage"
                    src={`http://api.rjwada.com/assets/${banner}`}
                    alt=""
                  />
                  {/* Image fetch end */}
                </div>
                <div className="product-button-section">
                  <div className="product-button buy ">
                    <Razorpay
                      className="product-button "
                      totalCartPrice={price}
                    />
                  </div>
                  <button
                    className="product-button-cart"
                    onClick={() => {
                      setTimeout(() => {
                        addToCart(datas);
                        navigate("/cart");
                      }, 1000);
                    }}
                  >
                    Add to cart
                  </button>
                  <button
                    className="product-button-cart"
                    onClick={() => {
                      setTimeout(() => {
                        addToWhishlist(datas);
                        navigate("/whishlist");
                      }, 1000);
                    }}
                  >
                    Add to whishlist
                  </button>
                </div>
              </div>
            </div>
            {/* TRY ON */}
            {/* <div className="try-on-section">
              <div className="try-on-header">
                <div className="try-on-heading">TRY ON</div>
                <div>
                 <button className="try-on-btn"
                //  Onlclick pr Dom Manipulate krke try-on-box wali class add hojaegi 
                 >Try On</button>
                </div>
              </div>
              <div className="try-on-box-wrapper">
                <div className="try-on-box">
                  <div className="try-on-icon">
                    <AddAPhotoIcon style={{fontSize:"100px",margin:"10px 10px"}}/>
                  </div>
                  <div className="try-on-text" style={{fontSize:"20px",fontWeight:"bold",margin:"10px 10px"}}>
                    Drag Photos and Videos here
                  </div>
                  <div className="try-on-btn-section">
                    <button className="try-on-select" style={{margin:"10px 10px"}}>
                      Select from file
                    </button>
                  </div>
                </div>
                
              </div>
            </div> */}
            {/* TRY ON */}
          </div>
          <div className="product-detail-section">
            <div className="product-details-wrapper">
              <div className="product-category-text">{description}</div>
              <div className="product-detail-header">
                <div className="product-detail-heading">{name}</div>
                <div
                  className="product-favourite-icon"
                  onClick={() => setClicked(true)}
                >
                  {clicked ? (
                    <FavoriteIcon style={{ cursor: "pointer", color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => {
                        setTimeout(() => {
                          addToWhishlist(datas);
                          // navigate("/whishlist");
                        }, 1000);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="product-manufac">Stubborn Factory</div>
              <div className="product-rating-section">
                <div className="star-rating">
                  <StarIcon style={{ color: "#FFAA15" }} />
                  <StarIcon style={{ color: "#FFAA15" }} />
                  <StarIcon style={{ color: "#FFAA15" }} />
                  <StarIcon style={{ color: "#FFAA15" }} />
                  <StarIcon style={{ color: "#FFAA15" }} />
                </div>
                <div className="text-rating">
                  <pre> 17 Rating and 28 Reviews</pre>
                </div>
              </div>
              <div className="product-price-section">
                <div className="product-price-text">₹ {price}</div>
                <div className="product-strike-price">₹ 1599</div>
                <div className="product-discount">75%</div>
              </div>
              <div className="tax-text">Price inclusive of all taxes</div>
              <div className="product-size-header">
                {" "}
                <br />
                <div className="product-size-heading">
                  <h3>Please select a size</h3>
                </div>
                {/* <div className="product-size-chart-text">Size Chart</div> */}
              </div>
              <div className="product-size-boxes">
                {size[0] && (
                  <button
                    className="product-size-item"
                    onClick={() => setselectedsize(size[0])}
                  >
                    {size[0]}
                  </button>
                )}
                {size[1] && (
                  <button
                    className="product-size-item"
                    onClick={() => setselectedsize(size[1])}
                  >
                    {size[1]}
                  </button>
                )}
                {size[2] && (
                  <button
                    className="product-size-item"
                    onClick={() => setselectedsize(size[2])}
                  >
                    {size[2]}
                  </button>
                )}
                {size[3] && (
                  <button
                    className="product-size-item"
                    onClick={() => setselectedsize(size[3])}
                  >
                    {size[3]}
                  </button>
                )}
                {size[4] && (
                  <button
                    className="product-size-item"
                    onClick={() => setselectedsize(size[4])}
                  >
                    {size[4]}
                  </button>
                )}
              </div>
              <div className="size-lower-text">
                Size Not Available?
                <span className="product-notify">Notify Me</span>
              </div>
              {/* <div className="quantity-section">
                <div className="quantity-text">Quantity</div>
                <input className="quantity-input-box" type="-" />
              </div>
              <div className="deliver-to-text">Deliver to</div>
              <div className="deliver-add-section">
                <input
                  type="text"
                  name=""
                  id=""
                  className="pincode-input"
                  placeholder="Enter Delivery Pincode"
                />
                <button className="pincode-check-btn">Check</button>
              </div> */}
            </div>

            {/* <div className="product-color-menu">
              <div className="product-color-item">
                <img src="" alt="color_img" />
              </div>
              <div className="product-color-item">
                <img src="" alt="color_img" />
              </div>
              <div className="product-color-item">
                <img src="" alt="color_img" />
              </div>
              <div className="product-color-item">
                <img src="" alt="color_img" />
              </div>
              <div className="product-color-item">
                <img src="" alt="color_img" />
              </div>
              <div className="product-color-item">
                <img src="" alt="color_img" />
              </div>
            </div> */}
            <div className="product-accordion">
              {/* <Accordion
                defaultExpanded={true}
                className="product-accordion-main"
              >
                <AccordionSummary
                  id="panel1-header"
                  className="product-accordion-header"
                  expandIcon={<ExpandMoreIcon />}
                  defaultExpanded={true}
                >
                  <div className="accordion-heading">Product Details</div>
                </AccordionSummary>
                <AccordionDetails className="product-accordion-detail">
                  <div className="product-detail-list">
                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Type :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>Polo Neck</p>
                      </div>
                    </div>

                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Sleeve :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>Long Sleeve</p>
                      </div>
                    </div>
                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Fit :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>Regular</p>
                      </div>
                    </div>

                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Fabric :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>Cotton Blend</p>
                      </div>
                    </div>
                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Pack of :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>1</p>
                      </div>
                    </div>

                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Neck Type :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>Polo Neck</p>
                      </div>
                    </div>
                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Ideal For :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>Unisex</p>
                      </div>
                    </div>

                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Size :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>S</p>
                      </div>
                    </div>
                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Pattern :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>Solid</p>
                      </div>
                    </div>

                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Suitable For :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>Western Wear</p>
                      </div>
                    </div>
                    <div class="product-detail-row">
                      <div class="product-detail-column">
                        <p>Reversible :</p>
                      </div>
                      <div class="product-detail-column">
                        <p>No</p>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion> */}
              <Accordion
                defaultExpanded={false}
                className="product-accordion-main"
              >
                <AccordionSummary
                  id="panel1-header"
                  className="product-accordion-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <div className="accordion-heading">Product Description</div>
                </AccordionSummary>
                <AccordionDetails className="product-accordion-detail">
                  {description}
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded={false}
                className="product-accordion-main"
              >
                <AccordionSummary
                  id="panel1-header"
                  className="product-accordion-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <div className="accordion-heading">Refund and Returns</div>
                </AccordionSummary>
                <AccordionDetails className="product-accordion-detail">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat nam, placeat excepturi autem enim culpa aperiam
                  voluptates reiciendis? Fugiat itaque similique et quod commodi
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
        {/* <div className="section-two">
          <div className="product-row-wrapper">
            <div className="product-row-heading">
              You might be interested in
            </div>
            <div className="product-row">
              <div className="product-card-comp">
                <ProductCard/>
              </div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
            </div>
          </div>
          <div className="product-row-wrapper">
            <div className="product-row-heading">Similar Products</div>
            <div className="product-row">
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
            </div>
          </div>
          <div className="product-row-wrapper">
            <div className="product-row-heading">Recently Viewed</div>
            <div className="product-row">
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
            </div>
          </div>
          <div className="product-row-wrapper">
            <div className="product-row-heading">
              Customers who bought this item also bought
            </div>
            <div className="product-row">
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
              <div className="product-card-comp">  <ProductCard/></div>
            </div>
          </div>
        </div> */}
        <Footer />
      </div>
    </div>
  );
};

export default ParticularProduct;