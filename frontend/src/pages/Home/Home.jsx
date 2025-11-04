import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { assets } from '../../assets/assets.js'


const Home = () => {

  const [category,setCategory] =useState ("All")

  return (
    <div>
      <Header/>

      {/* Add this: */}
      <div style={{ textAlign: 'center', margin: '48px auto' }}>
        <img
          src={assets.mxwezmql}
          alt="Menu"
          style={{ maxWidth: '340px', borderRadius: '20px' }}
        />
      </div>


      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  )
}

export default Home
