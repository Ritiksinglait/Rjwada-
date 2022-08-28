import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Razorpay from "../components/Razorpay";
import Toplist from "../components/Toplist";
import { auth, fs } from "../config/Config";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import "./Cart.css";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import RefreshIcon from "@mui/icons-material/Refresh";
import ProductCard from "../components/ProductCard";
import { textAlign } from "@mui/system";
import { senddata } from "../components/send";

const Cart = ({ userid }) => {
  let deliverycharges = 0;
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
  const [cartProducts, setCartProducts] = useState([]);

  const cart = fs.collection("cart");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        cart.onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
    });
  }, [user]);

  let particularProductArray = [];
  const handleProductDecrease = (p, userid, name, quantity, price, id) => {
    particularProductArray.map((ele) => {
      if (ele[0] === name && ele[1] === userid && quantity > 1) {
        ProdUpdate = p;
        ProdUpdate.quantity = ProdUpdate.quantity - 1;
        x -= price * quantity;
        auth.onAuthStateChanged((user) => {
          if (user) {
            fs.collection("cart")
              .doc("USER_ID = " + userid + ` PRODUCT_ID = ${id}`)
              .update(ProdUpdate)
              .then(() => {
                console.log("done decrement");
              });
          } else {
            console.log("can't decrement ");
          }
        });
      }
    });
  };

  let ProdUpdate;
  const handleProductIncrease = (p, userid, name, quantity, price, id) => {
    particularProductArray.map((ele) => {
      if (ele[0] === name && ele[1] === userid) {
        ProdUpdate = p;
        ProdUpdate.quantity = ProdUpdate.quantity + 1;
        x += price * quantity;
        auth.onAuthStateChanged((user) => {
          if (user) {
            fs.collection("cart")
              .doc("USER_ID = " + userid + ` PRODUCT_ID = ${id}`)
              .update(ProdUpdate)
              .then(() => {
                console.log("done increment");
              });
          } else {
            console.log("cant increment ");
          }
        });
      }
    });
  };
  const handleProductDelete = (p, userid, name, quantity, price, id) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("cart")
          .doc(`USER_ID = ` + userid + ` PRODUCT_ID = ${id}`)
          .delete()
          .then(() => {
            cartProducts = cartProducts.filter((item) => {
              return item.ID !== `USER_ID = ` + userid + ` PRODUCT_ID = ${id}`;
            });
            console.log("deleted item");
          });
      } else {
      }
    });
  };

  // const [fetcall, fetsetcall] = useState()

  let x = 0;
  function total() {
    cartProducts.map((p) => {
      const slicedid = p.ID.slice(10, 38);
      if (slicedid === userid) {
        x += p.price * p.quantity;
      }
      // x += 40;
    });
    return x;
  }

  const [useradd, setuseradd] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fs
          .collection("user_address")
          .doc(`${userid}`)
          .get()
          .then((snapshot) => {
            setuseradd(snapshot.data());
            // localStorage.setItem("City", snapshot.data().City);
            // localStorage.setItem("State", snapshot.data().State);
            // localStorage.setItem("Street", snapshot.data().Street);
            // localStorage.setItem("Country", snapshot.data().Country);
            // localStorage.setItem("Landmark", snapshot.data().Landmark);
          });
      } else {
        setuseradd(null);
      }
    });
  }, [user]);

  const [products,setProducts] = useState({})

  
  return (
    <div>
      <Navbar user={user} />
      <Toplist />
      <div className="cart-wrapper">
        <div className="cart-main-section">
          <div className="cart-left-card-wrapper">
            <div className="cart-mybag-section">
              <div className="mybag-text">
                <span className="cart-bold-text">My Bag </span>
                <span className="cart-brackets" style={{ marginLeft: "2px" }}>
                  {/* (<span className="cart-items">{particularProductArray.length}</span> Items) */}
                </span>
              </div>  
              {/* <div
                className="mybag-checkbox"
                style={{ margin: "2px", fontWeight: "bold" }}
              >
                <input type="checkbox" name="" id="" />
                <span id="bag-selected-item" style={{ margin: "2px" }}>
                1
                </span>
                /
                <span id="bag-total-item" style={{ margin: "2px" }}>
                4
                </span>
                Items Selected
              </div> */}
            </div>
            <div className="cart-item-section">
              <div className="card-item">
                {cartProducts.length < 1 && (
                  <div className="noproduct">Add your favourites here</div>
                )}
                {cartProducts.length >= 1 && (
                  <div className="noproduct">
                    {cartProducts.map((p) => {
                      const slicedid = p.ID.slice(10, 38);
                      if (slicedid === userid) {
                        let tosend = {};
                        tosend["userid_id"] = localStorage.getItem("uid");
                        tosend["product_id"] = p.id;
                        tosend["quantity"] = p.quantity;
                        tosend["categoryId"] = p.categoryId;
                        tosend["banner"] = p.banner;
                        tosend["size"] = p.size[0];
                        particularProductArray.push([p.name, userid]);
                        console.log(tosend);
                        products[`${p.id}`] = tosend;

                        return (
                          <div
                            className="cart-card"
                            style={{ width: "100%" }}
                            key={p.id}
                          >
                            <div className="cart-img" style={{ width: "30%" }}>
                              <img
                                style={{ height: "200px", margin: "10px" }}
                                src={`http://api.rjwada.com/assets/${p.banner}`}
                                alt=""
                              />{" "}
                            </div>
                            <div className="cart-cart-details-incdec"
                              style={{
                                width: "70%",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "20px",
                                alignItems: "center",
                              }}
                            >
                              <div className="cart-carddetails">
                                <h4>{p.name}</h4>
                                {/* Product size : {p.sizes[0]} */}
                                {/* <h4>Price : {p.price}</h4> */}
                              </div>
                              <div className="incDec">
                                <div
                                  style={{
                                    cursor: "pointer",
                                    padding: "2px 4px",
                                  }}
                                  onClick={() =>
                                    handleProductDecrease(
                                      p,
                                      userid,
                                      p.name,
                                      p.quantity,
                                      p.price,
                                      p.id
                                    )
                                  }
                                >
                                  <Icon icon={minus} size={20} />
                                </div>
                                <div className="cart-quantity" style={{ padding: "2px 4px" }}>
                                  {p.quantity}
                                </div>
                                <div
                                  style={{
                                    cursor: "pointer",
                                    padding: "2px 4px",
                                  }}
                                  onClick={() =>
                                    handleProductIncrease(
                                      p,
                                      userid,
                                      p.name,
                                      p.quantity,
                                      p.price,
                                      p.id
                                    )
                                  }
                                >
                                  <Icon icon={plus} size={20} />
                                </div>
                              </div>
                              <button
                                className="product-button-cart"
                                onClick={() =>
                                  handleProductDelete(
                                    p,
                                    userid,
                                    p.name,
                                    p.quantity,
                                    p.price,
                                    p.id
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="cart-delivery-section">
              <div className="cart-address-wrapper">
                <div className="cart-add-header">
                  <div className="cart-add-icon">
                    <LocationOnRoundedIcon />
                  </div>
                  <div className="cart-add-heading">
                    <div className="add-heading-bold">Delivery Address</div>
                    <div className="add-heading-light">
                      We will deliver your order to this address
                    </div>
                  </div>
                </div>
                {useradd ? (
                  <div className="cart-address-detail-header">
                    <ul className="cart-details-list">
                      <li className="add-detail-fullname">{useradd.Name}</li>
                      {/* <li className="add-detail-addtype">Home</li> */}
                      <li className="add-detail-addline1">{useradd.Street}</li>
                      <li className="add-detail-landmark">
                        {useradd.Landmark}
                      </li>
                      <li className="add-detail-addline2">{useradd.City}</li>
                      <li className="add-detail-state-country">
                        {useradd.State}
                      </li>
                      <li className="add-detail-state-country">
                        {useradd.Country}
                      </li>
                      <li className="add-detail-phone">
                        Phone{" "}
                        <span className="add-detail-number">
                          {useradd.Mobile}
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <center>
                    <h4> Please go to settings page to add address </h4>
                  </center>
                )}
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <button className="change-add-btn">Change Address</button>
                </Link>
              </div>
              {/* <div className="cart-expected-wrapper">
                <div className="expected-icon-section">
                  <Inventory2OutlinedIcon
                    fontSize="large"
                    style={{ marginTop: "10px", marginLeft: "0px" }}
                  />
                </div>
                <div className="expected-details">
                  <div className="add-heading-bold">Expected Delivery</div>
                  <div className="add-heading-light">
                    Estimated Delivery dates for your order
                  </div>
                  <div className="codavail">Cash on Delivery Available</div>
                  <div className="est-delivery">
                    Estimated Delivery{" "}
                    <span
                      className="est-delivery-date"
                      style={{ fontWeight: "bold" }}
                    >
                      10 Aug
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="cart-item-order-wrapper">
            <div className="cart-order-section">
              <div className="cart-order-header">Order Summary</div>
              <div className="cart-order-calc-section">
                {/* <div class="order-detail-row">
                  <div class="order-detail-column">
                    <p>Item(s) Subtotal :</p>
                  </div>
                  <div class="order-detail-column">
                    <p style={{ marginLeft: "100px" }}>Rs {subtotal()}</p>
                  </div>
                </div> */}
                {/* <div class="order-detail-row">
                  <div class="order-detail-column">
                    <p>Delivery Charges :</p>
                  </div>
                  <div class="order-detail-column">
                    <p style={{ marginLeft: "100px" }}>Rs {deliverycharges}</p>
                  </div>
                </div> */}
                {/* <div class="order-detail-row">
                  <div class="order-detail-column">
                    <p>Total :</p>
                  </div>
                  <div class="order-detail-column">
                    <p style={{ marginLeft: "100px" }}>Rs 639</p>
                  </div>
                </div>
                <div class="order-detail-row">
                  <div class="order-detail-column">
                    <p>Coupon Discount :</p>
                  </div>
                  <div class="order-detail-column">
                    <p style={{ marginLeft: "96px", color: "#00C781" }}>
                      -Rs 40
                    </p>
                  </div>
                </div> */}
                <div class="order-detail-row" style={{marginLeft:"10px"}}>
                  <div class="order-detail-column" style={{textAlign:'left'}}>
                    <p>Total :</p>
                  </div>
                  <div class="order-detail-column">
                    <p style={{ marginLeft: "100px" }}>
                      Rs {deliverycharges + total()}
                    </p>
                  </div>
                </div>
                <div class="order-detail-row">
                  <div className="place-order-btn">
                    <Razorpay totalCartPrice={x} products={products} />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="cart-coupon-section">
              <div
                className="coupon-heading"
                style={{ fontSize: "20px", fontWeight: "bold", margin: "10px" }}
              >
                Apply Coupon
              </div>
              <div className="coupon-input-section">
                <input type="text" name="" id="" className="coupon-input" />
                <button type="submit" className="coupon-input-btn">
                  Apply
                </button>
              </div>
              <div
                className="coupon-normal-text"
                style={{ fontSize: "16px", margin: "10px 10px" }}
              >
                Applicable Coupon
              </div>

              <div className="coupon-item-wrapper">
                <label className="coupon-container">
                  <div className="coupon-details-wrapper">
                    <div
                      className="coupon-item-header"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Savings :{" "}
                      <span
                        className="coupon-discount"
                        style={{ color: "#00C781" }}
                      >
                        Rs 40
                      </span>
                    </div>
                    <div
                      className="coupon-code-name"
                      style={{ margin: "10px 0px" }}
                    >
                      FREE DEL
                    </div>
                    <div className="coupon-code-detail">
                      Extra upto 30% on Rs.254 and Above. <br />
                      Max discount Rs.130
                    </div>
                    <a
                      href=""
                      className="coupon-tc"
                      style={{ color: "#00C781" }}
                    >
                      Terms and Condition
                    </a>
                  </div>
                  <input
                    className="coupon-checkmark-input"
                    type="checkbox"
                    defaultChecked="checked"
                  />
                  <span className="coupon-checkmark" />
                </label>
                <label className="coupon-container">
                  <div className="coupon-details-wrapper">
                    <div
                      className="coupon-item-header"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Savings :{" "}
                      <span
                        className="coupon-discount"
                        style={{ color: "#00C781" }}
                      >
                        Rs 40
                      </span>
                    </div>
                    <div
                      className="coupon-code-name"
                      style={{ margin: "10px 0px" }}
                    >
                      FREE DEL
                    </div>
                    <div className="coupon-code-detail">
                      Extra upto 30% on Rs.254 and Above. <br />
                      Max discount Rs.130
                    </div>
                    <a
                      href=""
                      className="coupon-tc"
                      style={{ color: "#00C781" }}
                    >
                      Terms and Condition
                    </a>
                  </div>
                  <input
                    className="coupon-checkmark-input"
                    type="checkbox"
                    defaultChecked="checked"
                  />
                  <span className="coupon-checkmark" />
                </label>
              </div>
            </div> */}
          </div>
        </div>

        <div className="cart-quality-section">
          <div className="cart-quality-section-item">
            <VerifiedUserOutlinedIcon
              style={{ color: "#2196F3", marginRight: "4px" }}
            />{" "}
            <span
              className="quality-item-text"
              style={{ color: "#2196F3", fontWeight: "bold" }}
            >
              Secure Payments
            </span>
          </div>
          <div className="cart-quality-section-item">
            <CurrencyRupeeOutlinedIcon
              style={{ color: "#2196F3", marginRight: "4px" }}
            />{" "}
            <span
              className="quality-item-text"
              style={{ color: "#2196F3", fontWeight: "bold" }}
            >
              Cash On Delivery
            </span>
          </div>
          <div className="cart-quality-section-item">
            <VerifiedIcon style={{ color: "#2196F3", marginRight: "4px" }} />{" "}
            <span
              className="quality-item-text"
              style={{ color: "#2196F3", fontWeight: "bold" }}
            >
              Assured Quality
            </span>
          </div>
          <div className="cart-quality-section-item">
            <RefreshIcon style={{ color: "#2196F3", marginRight: "4px" }} />{" "}
            <span
              className="quality-item-text"
              style={{ color: "#2196F3", fontWeight: "bold" }}
            >
              Easy Returns
            </span>
          </div>
        </div>

        {/* <div className="cart-item-similar-section">
          <div
            className="cart-similar-header"
            style={{ fontSize: "30px", fontWeight: "bold" }}
          >
            Similar Products
          </div>
          <div className="cart-card-section">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="cart-card-section">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="cart-card-section">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div> */}
      </div>
      {/* <Razorpay/> */}
    </div>
  );
};

export default Cart;
