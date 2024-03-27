import React, { Component } from 'react';
import BookService from "../services/BookService";
import isAdmin from '../services/isAdmin';

class AddBook extends Component {
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            title: "", 
            titleError: "",          
            author: "",
            authorError: "",
            categories: [],
            chosenCategory: "BIOGRAPHY",
            loaded: false
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this)
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this)
        this.addOrUpdateBook = this.addOrUpdateBook.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value})
    }

    changeAuthorHandler = (event) => {
        this.setState({author: event.target.value})
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
                        chosenCategory: response.data.category,
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


    addOrUpdateBook = (event) => {
        event.preventDefault();
        let user_data = JSON.parse(localStorage.getItem('user_data'))
        let user_id = user_data.id
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('author', this.state.author);
        formData.append('category', this.state.chosenCategory)
        formData.append('user_id', user_id);

        if(this.state.title === "") this.setState({titleError: "This field is required"})
        if(this.state.author === "") this.setState({authorError: "This field is required"})
        else{
            if(this.state.id === "-1"){
                BookService.addBook(formData).then(response=>{
                    this.props.history.push("/books")
                })
            }
            else{
                BookService.updateBook(formData, this.state.id).then(response=>{
                    this.props.history.push("/books")
                })
            }
        }
    }

    cancel(){
        this.props.history.push("/books");
    }

    getTitle(){
        if(this.state.id === "-1") return <h3 className="text-center">Add Book</h3>
        else return <h3 className="text-center">Update Book</h3>
    }

    selectCategory = (event) =>{
        let chosenCat = this.state.categories
        .filter(category => category.toLowerCase() === event.target.value.toLowerCase()).toString()
        this.setState({chosenCategory: chosenCat})
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="route">
                        <div className="card col-md-6 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form className="md-form">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input placeholder="Title" name="title" className="form-control"
                                               value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    {this.state.titleError && (
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.titleError}
                                        </div>)                                         
                                     }
                                    <div className="form-group">
                                        <label>Author</label>
                                        <input placeholder="Author" name="author" className="form-control"
                                               value={this.state.author} onChange={this.changeAuthorHandler}/>
                                    </div>
                                    {this.state.authorError && (
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.authorError}
                                        </div>)                                         
                                     }
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

                                    <button className="btn btn-success" style={{marginTop:"20px"}} onClick={this.addOrUpdateBook}>Save</button>
                                    <button className="btn btn-danger" style={{marginLeft: "10px", marginTop:"20px"}} onClick={this.cancel.bind(this)} >Cancel</button>
                                    {!isAdmin() &&
                                        <div className="alert alert-info" style={{marginTop:"20px"}}>
                                            <strong>Info!</strong>   After adding a book, admin has to confirm it!
                                        </div>  
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddBook;