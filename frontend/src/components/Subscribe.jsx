import React from 'react'
import './Subscribe.css'
const Subscribe = () => {
  return (
    <div className='subscribe-wrap'>
        <div className='subscribe'>
            <div className="subs-form">
                <div className='sub-form'>
                    <label className='subs-label' for="name">Name</label>
                    <input type="text" className='subs-input'/><br />
                </div>
                <div className='sub-form'>
                    <label className='subs-label' for="name">Email address</label>
                    <input type="text" className='subs-input'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Subscribe