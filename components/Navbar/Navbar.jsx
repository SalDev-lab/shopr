import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='admin-navbar'>
      <div className="navbar-left">
        <img className='logo' src={assets.logo} alt="Logo" />
        {/* <h2 className="admin-title">Admin Panel</h2> */}
      </div>
      <div className="navbar-right">
        <div className="profile-section">
          <img className='profile' src={assets.profile_image} alt="Profile" />
          <p className='profile-name'>Admin</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
