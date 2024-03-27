import React, { Component } from 'react';
import RateService from "../services/RateService"

class Slider extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.id,
            value: props.value
        }
        this.changeValue = this.changeValue.bind(this)
        this.saveRate = this.saveRate.bind(this)
    }

    changeValue(event){
        this.setState({value: event.target.value})
    }
    
    saveRate(){
        let user_data = JSON.parse(localStorage.getItem('user_data'))
        let user_id = user_data.id
        RateService.addRate(this.state.value,this.state.id, user_id)
        window.location.reload(false)
    }

    render() {
        return (
        <div className="slider">
            <input type="range" className="range slider"  min="1" max="10"  name="rate" value={this.state.value} onChange={this.changeValue}/>
            <p>Value:<output className="bubble"> {this.state.value} </output></p>    
            <button className="btn btn-primary" type="submit" onClick={this.saveRate}>Save</button>   
        </div>
        );
    }
}

export default Slider;
