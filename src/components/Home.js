import React, { Component } from 'react';
import vblogo from '../vblogo.png';

import '../styles/home.css';
import Navbar from '../components/NavBar'
import Publicboard from './Publicboard';
import {Link} from 'react-router-dom'




class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            public:false

        }
    }

    render() {
        return(
            <div className="landing">
                
                  {localStorage.setItem('username',"*")}
           
                {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                    <div className="container">
                    <a className="navbar-brand js-scroll-trigger" href="#page-top">VeriBoard</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#services">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#portfolio">Portfolio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav> */}
                <div className="container">
                <h1 className="title">VeriBoard</h1>
                <p className="subtitle">There's no such thing as a stupid question</p>
                <p className="subtitle">Ask. Discuss. Learn.</p>
                <br />
                <div className="subtitle">
                    <Link to ="/publicboard">
                    <button className="btn btn-outline-info btn-lg" id="bt-color" >Get Started! </button>
                    {/* {this.state.public? } */}
                   {/* {window.open("http://localhost:3000/publicboard")} */}
                  
                    </Link>
                </div>
                <div className="subtitle">
                    <img src={vblogo} alt="logo" />
                </div>
                </div>
        
            </div>
        )
    }

}

export default Home;