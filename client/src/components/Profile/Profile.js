import React, { Component } from 'react';
import { fetchUserData } from '../../Actions/UserAction';

import { connect } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Form,
} from "reactstrap";


class Profile extends Component {
  constructor() {
      super();
      this.state = {};
  }
  componentDidMount() {
    this.props.fetchUserData();
  }
  render() {
      var userInfo = this.props.user && this.props.user.userInfo;
      console.log("RRRRRRRRRRRRR", userInfo)
     return (
          <section className="section section-shaped  pb-250">
           <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            <Container className="gray-cointainer lg-md mt-lg-md">
              <Form>  
                <h6> Basic Info </h6>
                <Row>
                  <Col md="6">
                    <FormGroup> <Input  id="name"  defaultValue={userInfo.name} placeholder="Enter name"  type="text"  /> </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup> <Input  id="email" defaultValue={userInfo.email}  type="email"  /> </FormGroup>
                  </Col>
                </Row>
                <div>
                    <Button color="default" outline type="button"> Update  </Button>
                </div>
              </Form>
          </Container>
          </section>
     	)
    }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchUserData: () => dispatch(fetchUserData())    
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);




