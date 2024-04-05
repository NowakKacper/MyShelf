import React, { Component } from 'react';
import Form from "react-validation/build/form";
import BookService from "../services/BookService";
import CheckButton from "react-validation/build/button";
import ReportService from "../services/ReportService"

class Report extends Component {
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            title: "", 
            descriptionError: "",          
            author: "",
            categories: [],
            category: "BIOGRAPHY",
            loaded: false,
            message: "",
            successful: false,
            description: "",
            titleForLabel: "",
            authorForLabel: "",
            categoryForLabel: ""
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this)
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this)
        this.reportBook = this.reportBook.bind(this);
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value})
    }

    changeAuthorHandler = (event) => {
        this.setState({author: event.target.value})
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value})
        console.log(this.state.description)
    }

    componentDidMount(){
        let arrayOfCat = ["BIOGRAPHY", "FANTASY", "HISTORY", "HORROR", "NON_FICTION", "ROMANCE", "SCIENCE", "THRILLER", "OTHERS"]
        this.setState({categories: arrayOfCat})
        if (this.state.id !== "-1") {
            BookService.getBook(this.state.id)
                .then(response => {
                    this.setState({
                        title: response.data.title,
                        author: response.data.author,
                        category: response.data.category,
                        titleForLabel: response.data.title,
                        authorForLabel: response.data.author,
                        categoryForLabel: response.data.category,
                        loaded: true
                    });
                })
                .catch(error => {
                    console.error("Error while fetching book details:", error);
                });
        } else {
            this.setState({ loaded: true });
        }
    }

    reportBook = (event) => {
        event.preventDefault();
        let user_data = JSON.parse(localStorage.getItem('user_data'))
        let user_id = user_data.id
        const formData = new FormData();
        formData.append('description', this.state.description)
        formData.append('title', this.state.title);
        formData.append('author', this.state.author);
        formData.append('category', this.state.category)
        formData.append('user_id', user_id);

        if(this.state.description === "") this.setState({descriptionError: "This field is required"})
        else ReportService.reportBook(formData, this.state.id).then(
                response=>{
                    this.setState({
                        message: response.data,
                        successful: true
                    });
                }
            )
    }

    cancel(){
        this.props.history.push("/books");
    }

    selectCategory = (event) =>{
        let chosenCat = this.state.categories
        .filter(category => category.toLowerCase() === event.target.value.toLowerCase()).toString()
        this.setState({category: chosenCat})
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="route">
                        <div className="card col-md-6 offset-md-3">
                            <h2 className="text-center">Report</h2>
                            <div className="card-body">
                                <Form onSubmit={this.reportBook} ref={c => {this.form = c;}}>
                                    {!this.state.successful && (
                                    <div>
                                        <div className="form-group">
                                            <label>Book informations:</label>
                                            <label>{this.state.titleForLabel}, {this.state.authorForLabel}, {this.state.categoryForLabel}</label>
                                        </div>
                                        <div className="form-group">
                                            <label>Description of the problem:</label>
                                            <input placeholder="Description" name="description" className="form-control"
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        {this.state.descriptionError && (
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.descriptionError}
                                            </div>)                                         
                                        }
                                        <label>Here you can show admin what should be changed in your opinion:</label>
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input placeholder="Title" name="title" className="form-control"
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Author</label>
                                            <input placeholder="Author" name="author" className="form-control"
                                                value={this.state.author} onChange={this.changeAuthorHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select className="form-control" onChange={this.selectCategory}>
                                                <option name="biography">Biography</option>
                                                <option name="fantasy" >Fantasy</option>
                                                <option name="history">History</option>
                                                <option name="horror">Horror</option>
                                                <option name="non-fiction">Non_Fiction</option>
                                                <option name="romance">Romance</option>
                                                <option name="science">Science</option>
                                                <option name="thriller">Thriller</option>
                                                <option name="others">Others</option>
                                            </select>
                                        </div>

                                        <button className="btn btn-success" style={{marginTop:"20px"}} onClick={this.reportBook}>Report</button>
                                        <button className="btn btn-danger" style={{marginLeft: "10px", marginTop:"20px"}} onClick={this.cancel.bind(this)}>Cancel</button>
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
                                    <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c;}}/>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Report;