import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toplist from "../components/Toplist";
import { auth, fs } from "../config/Config";
import "../pages/TrackOrder.css";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
const TrackOrder = () => {
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

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("http://api.rjwada.com/items/inventory")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((actualdata) => {
  //       setData(actualdata.data);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  const user = Getcurrentuser();
  return (
    <div>
      <Navbar user={user} />
      <Toplist />
      <div className="track-order-wrapper">
          <h2>Feature Coming Soon...</h2>
      </div>
      {/* <div className="track-order-filter-section">
          to REMOVE THIS SECTION
          <li> track-order-filter-section - Iski width 0</li>
          <li> track-order-main-section - Iski width 100</li>
        </div> */}
      {/* <div className="track-order-main-section"> */}
      {/* <div className="track-search-wrapper">
            <center>
              <div className="track-search-container">
                <div
                  className="track-search-icon"
                  style={{
                    backgroundColor: "White",
                    padding: "2px 10px",
                    marginleft: "20px",
                    color: "grey",
                    marginTop: "2px",
                  }}
                >
                  <SearchIcon />
                </div>
                <div className="track-search-input-sec">
                  <input
                    type="text"
                    className="track-search-input"
                    placeholder="Search your orders here"
                  />
                </div>
                <div className="track-search-btn-sec">
                  <button className="track-search-btn">Search Orders</button>
                </div>
              </div>
            </center>
          </div> */}
      {/* <div className="track-order-item-wrapper">
            <div className="order-item-card">
              {data &&
                data.map((d) => {
                  return (
                    <>
                      <div>{d.id}</div> 
                      <div>{`${d.cancel_status}`?"true":"false"}</div> 
                      <div>{`${d.dispatch_status}`?"true":"false"}{d.dispatch_status}</div> 
                      <div>{`${d.in_progress_status}`?"true":"false"}{d.dispatch_status}</div> 
                      <div>{`${d.order_completed_status}`?"true":"false"}{d.dispatch_status}</div> 
                      <div>{`${d.return_status}`?"true":"false"}{d.dispatch_status}</div> 
                      <div>{d.color}</div> 
                      <div>{d.size}</div> 
                      <div>{d.quantity}</div> 
                      <div>{d.price}</div> <br />
                    </>
                  );
                })}
            </div> */}
      {/* </div>
        </div> */}
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default TrackOrder;
