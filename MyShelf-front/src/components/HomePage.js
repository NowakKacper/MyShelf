import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default class HomePage extends Component {

  render() {
    return (
      <div className="container">
          <h3 className="h3-homepage">Welcome to Regalik</h3>
          <div className="alert alert-primary info" role="alert">
            Go to <Link to="/login" className="alert-link">login page </Link> to use the app.<br/>
            If you do not have account go to <Link to="/register" className="alert-link">register page </Link>
          </div>
      </div>
    );
  }
}