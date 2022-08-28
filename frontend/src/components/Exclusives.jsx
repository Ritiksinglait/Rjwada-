import React from 'react'
import './Exclusives.css'
import Features from './Features'
const Exclusives = (props) => {
  return (
    <div className='exclusive'>
        <div className='title-exclusive'>
            <h1> {props.title} </h1>
        </div>
        <div className='shopby-exclusive'>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
            <div className="exclusive-cards"></div>
        </div>
        {
            (props.title==='Rjwada Exclusives')?
            <Features/>:null
        }
    
    </div>
  )
}

export default Exclusives