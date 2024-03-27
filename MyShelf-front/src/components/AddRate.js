import React, { Component } from 'react';
import RateService from "../services/RateService"

class AddRate extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.slider_id,
            value: props.value
        }
        this.saveRate = this.saveRate.bind(this)
    }
    
    saveRate(){
        let user_data = JSON.parse(localStorage.getItem('user_data'))
        let user_id = user_data.id
        RateService.addRate(this.state.value, this.state.id, user_id)
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" type="submit" onClick={this.saveRate}>Save</button>   
            </div>
        );
    }
}

export default AddRate;