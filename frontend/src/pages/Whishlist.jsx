import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toplist from "../components/Toplist";
import { auth, fs } from "../config/Config";
import "./Whishlist.css";
import { useNavigate } from "react-router-dom";

const Whishlist = ({ userid, addToCart }) => {
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

  const cart = fs.collection("whishlist");

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
        }, 1000);
      }
    });
  }, [userid]);
  const handleProductDelete = (p, userid, name, quantity, price, id) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("whishlist")
          .doc("USER_ID = " + userid + ` PRODUCT_ID = ${id}`)
          .delete()
          .then(() => {
            cartProducts=cartProducts.filter((item)=>{return item.ID !== `USER_ID = ` + userid + ` PRODUCT_ID = ${id}`})
            console.log("deleted item");
          });
      } else {
        console.log("error");
      }
    });
  };
  let particularProductArray = [];
  return (
    <div>
      <Navbar user={user} />
      {/* <Toplist /> */}
      <div className="shopby-particular-product">
        <center>
          <h1 style={{ fontFamily: "fantasy", fontWeight: "100" }}>
            My whishlist
          </h1>
          {cartProducts.length < 1 && (
            <center>
              <h5 style={{ padding: "10px", color: "black" }}>
              Add your favourites here
              </h5>
            </center>
          )}
        </center>
        {cartProducts.length >= 1 && (
          <div className="noproduct">
            {cartProducts.map((data) => {
              const slicedid = data.ID.slice(10, 38);

              if (slicedid === userid) {
                particularProductArray.push([data.name, userid]);
                return (
                  <div>
                    <div className="cart-card">
                      <img
                        className="cart-card-img"
                        style={{ height: "290px" }}
                        src={`http://api.rjwada.com/assets/${data.banner}`}
                        alt=""
                      />
                      <div className="cart-carddetails">
                        <h4> Product Name : {data.name}</h4>
                        {/* <h4> Product discount : {data.discount}</h4> */}
                        <h4> Product size : {data.size}</h4>
                        {/* Product size : {p.sizes[0]}  */}
                      </div>
                      <div className="cart-price-button">
                        <div style={{ marginRight: "10px" }}>
                          <h4>Price : {data.total_prod_price}</h4>
                        </div>
                        <div className="cart-btn">
                          <button
                            style={{ width: "190px" }}
                            onClick={() => {
                              console.log(data)
                              addToCart({data});
                              setTimeout(() => {
                                fs.collection("whishlist")
                                .doc(
                                  "USER_ID = " +
                                  userid +
                                  ` PRODUCT_ID = ${data.id}`
                                  )
                                  .delete();
                                navigate("/cart");
                              }, 1000);
                            }}
                            className="product-button-cart"
                          >
                            Add to Cart
                          </button>
                          <button
                            className="product-button-cart"
                            onClick={() =>
                              handleProductDelete(
                                data,
                                userid,
                                data.name,
                                data.quantity,
                                data.price,
                                data.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Whishlist;
