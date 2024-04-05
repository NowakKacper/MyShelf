import axios from 'axios'
import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/authService"
import { withRouter, Link } from "react-router-dom";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
    constructor(props){
        super(props)
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            message: ""
          };
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();
        
        this.setState({
          message: "",
        });
    
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.login(this.state.username, this.state.password).then(
            () => {
              let user_data = JSON.parse(localStorage.getItem('user_data'));
              if (user_data && user_data.token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + user_data.token;
              }
              this.props.history.push("/books");
              window.location.reload();
            }, 
            error => {
                this.setState({message: "Wrong username or password"});
            }
          );
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                  <h3 className="text-center">Login</h3>
                  <Form onSubmit={this.handleLogin}  ref={c => {this.form = c;}}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required]}
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
                            validations={[required]}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" >
                            <span>Login</span>
                        </button>
                    </div>  
                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                              {this.state.message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }}ref={c => {this.checkBtn = c;}}/>
                  </Form>
                  <div className="alert alert-primary" style={{marginTop:"30px"}} role="alert">  
                      If you do not have account go to <Link to="/register" className="alert-link">register page</Link>.
                  </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);