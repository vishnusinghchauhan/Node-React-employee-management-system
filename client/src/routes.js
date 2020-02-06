import React from 'react';
import { Route, Switch,  Link, Redirect} from 'react-router-dom';


import Home from './components/Home/Home'

import Login from './components/layout/Login'
import Register from './components/layout/Register'

import Profile from './components/Profile/Profile'


import {userService} from "./services/authentication.service";
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        userService.loggedIn() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

const routing = () => (
    <div>
	    <Switch>
   			<Route exact path="/" component={Home} label="Home"/>
   			<Route exact path="/login" component={Login} label="Login"/>
   			<Route exact path="/register" component={Register} label="Register"/>
        <PrivateRoute path="/profile/" component={Profile} label="Profile" />
	    </Switch>
    </div>
)
export default routing;