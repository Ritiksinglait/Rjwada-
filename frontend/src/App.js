import './App.css';
import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom'
import Productpage from './pages/ParticularCategory';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TrackOrder from './pages/TrackOrder';
import { Profile } from './pages/Profile';
import Whishlist from './pages/Whishlist';
import Cart from './pages/Cart'
import { useEffect, useState } from 'react';
import NotFound from './pages/NotFound';
import ParticularProduct from './pages/ParticularProduct';
import SendImage from './pages/SendImage';
import LocationPage from './pages/Locationpage';
import { auth, fs } from "./config/Config";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  const [backtop, setbacktop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setbacktop(true);
      }
      else {
        setbacktop(false);
      }
    })
  }, [])
  const gototop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function GetUserId() {
    const [uid, setuid] = useState(null);
    const [email, setemail] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setuid(user.uid); 
          setemail(user.email); 
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserId();

  // Add to cart
  let Product={};
  const cart = fs.collection("cart")
  function addToCart({data,size='L'}){
    if (uid !== null) {
      Product['id']=data.id
      Product['quantity']=1
      Product['banner']=data.banner
      Product['name']=data.name
      Product['categoryId']=data.category_id||null
      Product['price']=data.price
      Product['size']=size
      Product['total_prod_price']=Product.quantity*Product.price;
      cart.doc('USER_ID = '+uid+` PRODUCT_ID = ${data.id}`).set(Product).then(()=>{
        console.log('successfully added to cart')
      })
    } else {
      navigate("/login");
    }
  };
  // Add to whishlist
  let WhishlistProduct={};
  const Whishlistcart = fs.collection("whishlist")
  function addToWhishlist({data,size}){
    console.log(data,size)
    if (uid !== null) {
      WhishlistProduct['size']=size
      WhishlistProduct['id']=data.id
      WhishlistProduct['name']=data.name
      WhishlistProduct['category_id']=data.category_id
      WhishlistProduct['quantity']=1
      WhishlistProduct['banner']=data.banner
      WhishlistProduct['price']=data.price
      WhishlistProduct['total_prod_price']=WhishlistProduct.quantity*WhishlistProduct.price;
      Whishlistcart.doc('USER_ID = '+uid+` PRODUCT_ID = ${data.id}`).set(WhishlistProduct).then(()=>{
        console.log('successfully added to Whishlist')
      })
    } else {
      navigate("/login");
    }
  };

  localStorage.setItem("paymentdone",false)
  
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Homepage addToCart={addToCart} />} />
        <Route path='/productpage/:category_id'
          element={<Productpage addToCart={addToCart} />} />
        <Route path='/productpage/:category_id/:id' element={<ParticularProduct addToCart={addToCart} addToWhishlist={addToWhishlist} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/trackorder' element={<TrackOrder />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/whishlist' element={<Whishlist userid={uid} addToCart={addToCart}/>} />
        <Route path='/cart' element={<Cart userid={uid} />} />
        <Route path='/locationpage' element={<LocationPage />} />
        <Route path='/sendimage' element={<SendImage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* {
        backtop && (<button className='goOnTop' onClick={gototop}><h1>^</h1></button>)
      } */}
    </div>
  );
}

export default App;
