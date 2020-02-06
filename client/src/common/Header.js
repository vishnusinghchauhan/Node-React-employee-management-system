import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import { logout, fetchUserData } from "../Actions/UserAction";
import { connect } from 'react-redux';
import setAuthToken from "../utils/setAuthToken";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Headroom from "headroom.js";

import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";



class Header extends Component {
  constructor() {
      super();
      this.state = {};
  }
  componentDidMount() {
    //let headroom = new Headroom(document.getElementById("navbar-main"));
    //headroom.init();
    setAuthToken()
    this.props.getAuth()
    this.props.fetchUserData();
  }

  render() {
    var isUserLoggedin =  this.props && this.props.login && this.props.login.loggedIn
     return (

          <header className="header-global">
          <ToastContainer position="top-right" />

          <Navbar className="navbar-main navbar-transparent navbar-light headroom" expand="lg" id="navbar-main" >
          
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>

              <Container>
                    <UncontrolledCollapse navbar toggler="#navbar_global">
                      <Nav className="align-items-lg-center" navbar>
                          <NavItem> 
                            <NavLink className="nav-link-icon"  to="/"  tag={Link}  >Home</NavLink>
                        </NavItem>
                      </Nav>
                      <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
                            { !isUserLoggedin &&
                              <NavItem> 
                                  <NavLink className="nav-link-icon"  tag={Link}  to="/login">Login</NavLink>
                              </NavItem>
                            }
                            { !isUserLoggedin &&
                              <NavItem> 
                                  <NavLink className="nav-link-icon"  tag={Link}  to="/register">Register</NavLink>
                              </NavItem>
                            }
                            { isUserLoggedin &&
                              <UncontrolledDropdown nav>
                                <DropdownToggle nav>
                                  <span className="nav-link-inner--text">My Account</span>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem to="/Profile" tag={Link}>My Profile</DropdownItem>
                                  <DropdownItem to="/" onClick={(e) => {e.preventDefault(); this.props.logoutRequest()}} >Logout</DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            }
                      </Nav>
                    </UncontrolledCollapse>
              </Container>
          </Navbar>
        </header>

      )
   }

}


const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => dispatch(logout()),
    fetchUserData: () => dispatch(fetchUserData()),
    getAuth: () => dispatch({type:'GET_AUTH'}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);