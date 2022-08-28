import React,{ useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Exclusives from '../components/Exclusives'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ShopByCategory from '../components/ShopByCategory'
import Subscribe from '../components/Subscribe'
import Toplist from '../components/Toplist'
import { auth, fs } from "../config/Config";
import { useNavigate } from "react-router-dom";


const Homepage = ({addToCart}) => {
  const navigate = useNavigate;

  function Getcurrentuser(){
    const [user,setuser] = useState(null)
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          fs.collection('users').doc(user.uid).get().then((snapshot)=>{
            setuser(snapshot.data().Fullname)
          })
        } 
        else{
          setuser(null)
        }
      })
    },[])
    return user 
  } 

  const user = Getcurrentuser()


  return (
    <div>
        <Navbar user={user}/>
        <Toplist/>
        <Banner/>
        <ShopByCategory title={'Shop By Category'} addToCart={addToCart}/>
        {/* <Exclusives title={'Rjwada Exclusives'}/>
        <ShopByCategory title={'Hidden Gems'}  addToCart={addToCart}/>
        <Exclusives title={'Trending Add-ons'}/>
        <Subscribe/> */}
        <Footer/>
    </div>
  )
}

export default Homepage