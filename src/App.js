import React from 'react';
import NavBar from './components/NavBar';
import EachPost from './components/EachPost'
import Router from './components/Router'
import Home from './components/Home'
import Buttonss from './components/Buttonss'

const App= () => {
  return (
    <div>
      {/* <Buttonss/> */}
        {/* {console.log(localStorage.getItem("username"))}  */}

       {localStorage.getItem("username")=="*"?<Buttonss/>:<NavBar/>} 
    
     
      <Router/>
    </div>
  );
}

export default App;
