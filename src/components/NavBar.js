import React, {Component} from 'react';
import Buttonss from './Buttonss';
import {Link} from 'react-router-dom';
import '../styles/navbar.css';
import vbard from '../mypost1.jpg';


class NavBar extends Component{
    constructor(props){
        super (props);
    }
    //Add State


render(){
    return(
<div>
<nav className="navbar navcolor">
<a class="navbar-brand" href="#"> <img src={vbard} style={{height: '70px', width: '170px'}}></img></a>
    {/* <img src="https://media.licdn.com/dms/image/C4E0BAQFJWS9dHHT0jA/company-logo_200_200/0?e=2159024400&v=beta&t=WBMIM9eGXy-yXSOJXKZDbq9EL0fv4r9GK6rat3vCSwc" width="30" height="30" alt=""/>
    <a className="navbar-brand" href="#">Navbar</a> */}
  {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-haspopup="true" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{float: "left"}}>
    <span class="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link to ='/dashboard' className="nav-link" style={{color: 'white'}} >Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link to ='/profile' className="nav-link" >My Profile</Link>
      </li>
      <li className="nav-item">
        <Link to ='/viewpost' className="nav-link" >Posts</Link>
      </li>
      {/* <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="Visibility" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Posts
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Public Posts</a>
          <a className="dropdown-item" href="#">Private Posts</a>
        </div>
      </li> */}
      {/* <li className="nav-item">
        <a className="nav-link" href="#">Logout</a>
      </li> */}

    </ul>
  </div>
  <Buttonss/>
</nav>
</div>
    )
}
}

export default NavBar;