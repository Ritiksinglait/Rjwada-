import React from 'react'
import { useState, useEffect } from 'react'
import './Toplist.css'
const Toplist = () => {
  const [cate, setCate] = useState(null);
  useEffect(()=>{
    fetch('http://api.rjwada.com/items/category')
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualdata) => {
        setCate(actualdata.data)
      })
      .catch((err) => {
        console.log(err.message);
       });
  },[])
  return (
    <div className='toplist'>
        <ul className='toplist-categories'>
        {cate && cate.map((data)=>(
          <li className='cate' key={data.id}>
              {data.category_name}
          </li>
        ))} 
        </ul>
    </div>
  )
}

export default Toplist