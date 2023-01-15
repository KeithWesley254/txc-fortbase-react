import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';
import Login from '../pages/Login';
import Header from './Header';
import Hero from '../pages/Hero';
import UserProfile from '../pages/UserProfile';
import Technologies from '../pages/Technologies';
import AboutUs from '../pages/AboutUs';
import Soldiers from '../pages/Soldiers';
import Stories from '../pages/Stories';
import Memorial from '../pages/Memorial';
import Footer from './Footer';
import SpecificSoldier from '../pages/SpecificSoldier';
import SpecificGeneral from '../pages/SpecificGeneral';
import SpecificPlatoon from '../pages/SpecificPlatoon';
import { UserState } from '../UserContext';


function App() {

  const {user} = UserState();

  if (user === null) return <Login />

  return (
    <>
      <div className="overallTop">
        <Header />
        <main>
          <Routes>
            <Route exact='true' path='/homepage' element={<Hero />}/>
            <Route path='/user-profiles/:id' element={<UserProfile />}/>
            <Route path='/soldiers' element={<Soldiers />}/>
            <Route path='/stories' element={<Stories />}/>
            <Route path='/technologies' element={<Technologies />}/>
            <Route path='/memorial' element={<Memorial />}/>
            <Route path='/about-us' element={<AboutUs />}/> 
            <Route path='/soldiers/:id' element={<SpecificSoldier />}/>
            <Route path='/generals/:id' element={<SpecificGeneral />}/>  
            <Route path='/platoons/:id' element={<SpecificPlatoon />}/>  
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
