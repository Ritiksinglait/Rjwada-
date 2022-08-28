import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toplist from "../components/Toplist";
import "../pages/Locationpage.css";
import { auth, fs } from "../config/Config";
import { useNavigate } from "react-router-dom";

const LocationPage = () => {
  const navigate = useNavigate();
  const [userid, setuserid] = useState();
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
              setuserid(user.uid);
              console.log(user.uid);
              console.log(snapshot.data().Fullname);
            });
        } else {
          setuser(null);
        }
      });
    }, []);
    return user;
  }
  const user = Getcurrentuser();


  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [country, setcountry] = useState("");
  const [street, setstreet] = useState("");
  const [landmark, setlandmark] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const [success, setsuccess] = useState("");

  const handleaddress = (e) => {
    e.preventDefault();
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     setsuccess("Login successfull.");
    //     setemail("");
    //     setpassword("");
    //     seterrmsg("");
    //     setTimeout(() => {
    //       setsuccess("");
    //       navigate("/");
    //     }, 1000);
    //   })
    fs.collection("user_address")
      .doc(userid)
      .set({
        Name: name,
        Mobile: mobile,
        Country: country,
        Street: street,
        State: state,
        Landmark: landmark,
        City: city,
        Pincode: pincode,
      })
      .then(() => {
        setname("");
        setmobile("");
        setcountry("");
        setstreet("");
        setlandmark("");
        setstate("");
        setcity("");
        setpincode("");
        seterrmsg("");
        // setTimeout(() => {
        //   setsuccess("details added succesfully");
        //   // navigate("/");
        // }, 1000);
      })
      .catch((error) => seterrmsg(error.message));
    console.log(errmsg);
  };
  localStorage.setItem("street", street);
  localStorage.setItem("landmark", landmark);
  localStorage.setItem("city", city);
  localStorage.setItem("pincode", pincode);
  localStorage.setItem("state", state);
  localStorage.setItem("country", country);

  <Navbar user={user}/>
  return (
    <div>
      {/* <h2 className="addlocation-heading">
        <center>Add a new location</center>
      </h2> */}
      <div className="addlocation-wrapper">
        <div className="addlocation-image"></div>
        <div className="addlocation-form-wrapper">
          {/* Form */}
          {success ? <h3>details added successfully</h3> : null}
          <form className="addloc-form" onSubmit={handleaddress}>
            {/* * stated as required for all */}
            <div className="form-group">
              <label htmlFor="">
                Full Name <br />
                <input required
                  type="text"
                  className="addloc-input"
                  onChange={(e) => setname(e.target.value)}
                />
              </label>
            </div>

            <div className="form-group">
              <div class="addloc-row">
                <div class="addloc-column">
                  <label htmlFor="">
                    Mobile Number <br />
                    <input required
                      type="text"
                      className="addloc-input"
                      onChange={(e) => setmobile(e.target.value)}
                    />
                  </label>
                </div>
                {/* <div class="addloc-column">
                  <label htmlFor="">
                    Alternate Mobile Number <br />
                    <input required type="text" className="addloc-input" />
                  </label>
                </div> */}
              </div>
            </div>
            <div className="form-group">
              <div class="addloc-row">
                <div class="addloc-column">
                  <label htmlFor="">
                    Country <br />
                    <input required
                      
                      type="text"
                      className="addloc-input"
                      onChange={(e) => setcountry(e.target.value)}
                    />
                  </label>
                </div>
                <div class="addloc-column">
                  <label htmlFor="">
                    State <br />
                    <input required
                      
                      type="text"
                      className="addloc-input"
                      onChange={(e) => setstate(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">
                Street <br />
                <textarea
                  type="text"
                  className="addloc-input"
                  id="add-longtext"
                  rows="4"
                  onChange={(e) => setstreet(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="">
                Landmark <br />
                <textarea
                  type="text"
                  className="addloc-input"
                  id="add-longtext"
                  rows="4"
                  onChange={(e) => setlandmark(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="form-group">
              <div class="addloc-row">
                <div class="addloc-column">
                  <label htmlFor="">
                    City <br />
                    <input required
                      
                      type="text"
                      className="addloc-input"
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </label>
                </div>
                <div class="addloc-column">
                  <label htmlFor="">
                    Pincode <br />
                    <input required
                      type="text"
                      className="addloc-input"
                      onChange={(e) => setpincode(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* <div className="form-group">
              <input required type="checkbox" />
              <label htmlFor="" id="checkbox-label">
                Make this as my default Address
              </label>
            </div>
            <div className="addloc-address-input">
              <label htmlFor=""></label>
            </div>
            <div className="addloc-addtype-wrapper">
              <label htmlFor="">
                Address Type
                <br />
              </label>
              <select class="addloc-select">
                <option value="none" selected disabled hidden>
                  Select
                </option>
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>
            </div> */}

            <button className="addloc-btn" type="submit">
              Add Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
