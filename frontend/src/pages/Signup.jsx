import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../pages/Signup.css";
import { auth, fs } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { initializeAuthentication } from "../config/Config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const [success, setsuccess] = useState("");

  const [userGoogle, setUserGoogle] = useState("");

  const handleSignupGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const userGoogle = result.user;
      console.log(userGoogle);
      fs.collection("users")
        .doc(userGoogle.uid)
        .set({
          Fullname: userGoogle.displayName,
          Email: userGoogle.email,
          Password: "Signed with google",
        })
        .catch((error) => {
          seterrmsg(error.message);
        })
        .then(() => {
          setsuccess("Signup successfull");
          setfullname("");
          setemail("");
          setpassword("");
          seterrmsg("");
          setTimeout(() => {
            setsuccess("");
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          seterrmsg(error.message);
        });
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            Fullname: fullname,
            Email: email,
            Password: password,
          })
          .then(() => {
            setsuccess("Signup successfull.");
            setfullname("");
            setemail("");
            setpassword("");
            seterrmsg("");
            setTimeout(() => {
              setsuccess("");
              navigate("/login");
            }, 1000);
          })
          .catch((error) => {
            seterrmsg(error.message);
          });
      })
      .catch((error) => {
        seterrmsg(error.message);
      });
  };

  return (
    <>
      <Navbar />
      {success && (
        <>
          <div style={{width:"50%",backgroundColor:"#7DCE13", margin:"auto", padding:"5px", borderRadius:"10px", color:"white", fontWeight:"bold"}} className="success-msg">{success}</div>
        </>
      )}
      {errmsg && (
        <>
          <div style={{width:"50%",backgroundColor:"red", margin:"auto", padding:"5px", borderRadius:"10px", color:"white", fontWeight:"bold"}} className="success-msg"><center>Please enter details carefully</center></div>
        </>
      )}
      <div className="login-wrapper">
        <div className="login">
          <div className="login-content">
            <span className="login-title">
              {/* Add logo here */}
              Rjwada
            </span>
            <span className="login-instructions">Please Signup</span>
            <div className="login-btn" onClick={handleSignupGoogle}>
              <button className="login-google">
                {/* googel icon */}
                Sign up with Google
              </button>
            </div>
            <div className="login-or">- OR -</div>
            {/* --------------form starts------------------- */}
            <form className="login-form" onSubmit={handleSignup}>
              <label className="signup-label">
                <span>Full name</span>
                <input
                  type="text"
                  name="fullname"
                  className="login-miniform"
                  required
                  onChange={(e) => setfullname(e.target.value)}
                  value={fullname}
                />
              </label>
              <label className="signup-label">
                <span>Email Address</span>
                <input
                  type="email"
                  name="mail"
                  className="login-miniform"
                  required
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
              </label>
              <label className="signup-label">
                <span>Password</span>
                <input
                  type="password"
                  name="Password"
                  className="login-miniform"
                  required
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </label>
              {/* <label className="signup-label">
                <span>Re-enter password</span>
                <input
                  type="password"
                  name="Password"
                  className="login-miniform"
                  required
                  onChange={(e) => setrepassword(e.target.value)}
                  value={repassword}
                />
              </label> */}
              <div className="login-btn">
                <button type="submit" className="login-signup">
                  Sign up
                </button>
              </div>
              <Link
                to={"/login"}
                className="login-btn-login"
                style={{
                  padding: "6px",
                  borderRadius: "3px",
                  textAlign: "center",
                  marginTop: "10px",
                  width: "97.5%",
                }}
              >
                Log in
              </Link>
              <div className="login-tyc">
                By signing up you agree to Housy's{" "}
                <a className="login-link-tyc">Terms and conditions</a> and{" "}
                <a className="login-link-tyc">Privacy policy.</a>
              </div>
            </form>

            {/* {errmsg && (
              <>
                <div className="error-msg">
                  <br />
                  <br />
                  {errmsg}
                </div>
              </>
            )} */}
            {/* --------------form ends------------------- */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
