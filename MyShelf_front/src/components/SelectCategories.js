import React, { Component } from 'react';

class SelectCategories extends Component {
    constructor(props){
        super(props)
        this.state = {
            categories: [],
            clickedButton: []
        }
        this.handleButton = this.handleButton.bind(this)
    }

    componentDidMount(){
        let arrayOfCat = ["ALL","BIOGRAPHY", "FANTASY", "HISTORY", "HORROR", "NON_FICTION", "ROMANCE", "SCIENCE", "THRILLER", "OTHERS"]
        this.setState({categories: arrayOfCat})
        this.state.clickedButton.push("ALL")
        this.setState({clickedButton: this.state.clickedButton})
        console.log(this.state.clickedButton)
        this.props.onSelectCategories(this.state.clickedButton)
    }
    
    async handleButton(event){
                
        await this.setState({clickedButton: this.state.clickedButton.filter(function(category) {
            return category !== "ALL"
            }) 
        })

        let ifActive = this.checkActive(event.target.value)
                
        if(ifActive){
            this.setState({clickedButton: this.state.clickedButton.filter(cat => cat !== event.target.value)})
        }
        else{
            this.state.clickedButton.push(event.target.value)
            this.setState({clickedButton: this.state.clickedButton})         
        }

        if(this.state.clickedButton.includes("ALL")){
            await this.setState({clickedButton: this.state.clickedButton.filter(function(category) {
                return category === "ALL"
                }) 
            })    
        }

        this.props.onSelectCategories(this.state.clickedButton)
    }

    checkActive(category){
        return this.state.clickedButton.includes(category)
    }


    render() {
        return (
            <div>
                <div className="row form-group categories" style={{margin: "0 0 15px 30px"}}>
                    {this.state.categories.map((cat, i) =>{
                        return (<button key={i} className={this.checkActive(cat) ? "btn btn-info " : "btn category"} style={{marginRight: "20px"}} value={cat} onClick={this.handleButton}>{cat}</button>)
                    })}
                    
                </div>
            </div>
        );
    }
}

export default SelectCategories;