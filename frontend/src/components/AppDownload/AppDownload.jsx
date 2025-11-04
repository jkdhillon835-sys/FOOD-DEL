import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p> Download our app and enjoy your favorite meals anytime, anywhere — faster, fresher, and right at your fingertips. </p>
      <div className="app-download-platforms">
        <img src= { assets.play_store} alt="" />
        <img src= { assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload