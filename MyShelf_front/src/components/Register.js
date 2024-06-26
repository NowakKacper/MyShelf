import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/authService"
import {  Link } from "react-router-dom";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const checkEmail = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };

  const checkUsername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
  const checkPassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };


class Register extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
          username: "",
          email: "",
          password: "",
          successful: false,
          message: ""
        };
    }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }

      handleRegister(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password
          ).then(
            response => {
              this.setState({
                message: response.data,
                successful: true
              });
            },
            error => {
              const resMessage = error.response.data

              this.setState({
                successful: false,
                message: resMessage
              });
            }
          );
        }
      }


    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                <h3 className="text-center">Registration</h3>
                    <Form onSubmit={this.handleRegister} ref={c => {this.form = c;}}>
                      {!this.state.successful && (
                        <div>
                          <div className="form-group">
                          <label htmlFor="username">Username</label>
                          <Input
                              type="text"
                              className="form-control"
                              name="username"
                              value={this.state.username}
                              onChange={this.onChangeUsername}
                              validations={[required, checkUsername]}
                          />
                          </div>

                          <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <Input
                              type="text"
                              className="form-control"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChangeEmail}
                              validations={[required, checkEmail]}
                          />
                          </div>

                          <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Input
                              type="password"
                              className="form-control"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChangePassword}
                              validations={[required, checkPassword]}
                          />
                          </div>
                          <br></br>
                          <div className="form-group">
                          <button className="btn btn-primary btn-block">Sign Up</button>
                          </div>
                        </div>
                      )}

                      {this.state.message && (
                        <div className="form-group">
                            <div
                            className={
                                this.state.successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                            >
                              {this.state.message}
                          </div>
                        </div>
                      )}
                      <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c;}}
                      />
                    </Form>
                    {this.state.message.length === 0 &&
                      (
                        <div className="alert alert-primary" style={{marginTop:"30px"}} role="alert">  
                          If you have an account go to <Link to="/login" className="alert-link">login page</Link>.
                        </div>
                      )
                    }
                    
                </div>
            </div>
        );
    }
}

export default Register;