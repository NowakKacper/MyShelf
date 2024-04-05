import React, { Component } from 'react';
import authService from '../services/authService';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
        }
    }

    componentDidMount() { 

        const currentUser = authService.getCurrentUser();
    
        if (!currentUser) this.setState({ redirect: "/home" });
        
        else this.setState({ currentUser: currentUser, userReady: true })
    }

    render() {
        if (this.state.redirect) {
            this.props.history.push(this.state.redirect);
            window.location.reload();
          }
      
        const { currentUser } = this.state;

        return (
            <div className="container">
                {(this.state.userReady) ?
                <div>                   
                    <h3 style={{margin: "30px 0 30px 0"}}>
                        <strong>Your data account</strong>
                    </h3>
                    <ul className="list-group" >
                        <li className="list-group-item" ><strong>Username:</strong> {currentUser.username}</li>
                        <li className="list-group-item" ><strong>Token to authorization:</strong>: 
                            {currentUser.token.substring(0, 20)} ...{" "}
                            {currentUser.token.substr(currentUser.token.length - 20)}
                        </li>
                        <li className="list-group-item"><strong>Id:</strong> {currentUser.id}</li>
                        <li className="list-group-item"><strong>Email:</strong> {currentUser.email}</li>
                        <li className="list-group-item"><strong>Authorities:</strong> {currentUser.roles}</li>
                    </ul>
                    
                </div>: null}
                        
            </div>
        );
    }
}

export default Profile;