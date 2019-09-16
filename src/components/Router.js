import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import EachPost from '../components/EachPost';
import Login from '../components/Login';
import Profile from '../components/profile';
import Register from '../components/Register';
import Buttonss from '../components/Buttonss'
import Home from '../components/Home'
import Publicboard from '../components/Publicboard'

const Router = () => {

    return(
        <div>
            <Switch>
                <Route path ="/dashboard" component={Dashboard}></Route>
                <Route path ="/viewpost" component={EachPost}></Route>
                <Route path ="/register" component={Register}></Route>
                <Route path="/publicboard" component={Publicboard}></Route>
                <Route path ="/login" component={Login}></Route>
                <Route path ="/profile" component={Profile}></Route>
                <Route path ="/loginhome" component={Buttonss}></Route>
                <Route path = "/" component={Home}></Route>
                
            </Switch>
        </div>
    );
}

export default Router;