import React from 'react';
import {
  Nav,
  NavLink,
  NavLinkage
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
      <NavLinkage to='/eciks'>
          <img src={require('../../images/spx.png')} alt='logo' style={{width:"85px", height:"50px"}}/>
        </NavLinkage>


      <NavLinkage to='/eciks' >
          <img src={require('../../images/ck.jpg')} alt='logo' style={{width:"80px", height:"40px",marginTop:"5px"}}/>
        </NavLinkage>
        <NavLinkage to='/tcap' >
          <img src={require('../../images/logo_GCF2.png')} alt='logo' style={{width:"70px", height:"40px",marginTop:"5px"}}/>
        </NavLinkage>
        <NavLinkage to='/tcap' >
          <img src={require('../../images/unep3.png')} alt='logo' style={{width:"95px", height:"40px",marginTop:"5px"}}/>
        </NavLinkage>
        <NavLink to='/eciks' style={{color:"white", fontWeight:"bold", fontSize:"18px", paddingLeft:'15%'}}>
        Cook Islands Coastal Inundation and Forecast System - Demo
        </NavLink>
      </Nav>
    </>
  );
};

export default Navbar;
