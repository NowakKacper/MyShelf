import React, { Component } from 'react';
import BookService from "../services/BookService";
import Slider from './Slider';
import isAdmin from '../services/isAdmin'
import '../App.css'
import SelectCategories from './SelectCategories';

class BooksPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            books: [],
            selectedBooks: [],
            slider_value: 5,
            selectedCategories: [],
            loaded:false
        }
        this.addBook = this.addBook.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
        this.updateBook = this.updateBook.bind(this)
        this.changeArray = this.changeArray.bind(this);
        this.handleCategories = this.handleCategories.bind(this)
    }

    componentDidMount(){
        BookService.getAllBooks().then(
            response => {
                this.setState({
                    books: response.data.sort(this.compareByIdDesc),
                    loaded: true
                })
            }
        )   
    }

    addBook(){
        this.props.history.push(`/books/add-book/-1`);
    }

    deleteBook(id){
        BookService.deleteBook(id);
        window.location.reload(false);
    }

    updateBook(id){
        this.props.history.push(`/books/add-book/${id}`)
    }

    mapBooks(books){
        books.map(book => {
            if(book.user_rate === -1) book.user_rate = "-";
            return book;
        })
        books.map(book => {
            if(book.amountOfRatings === 0) book.avg_rate = "-";
            return book;
        })
        return books
    }

    changeArray(event){
        let value = event.target.value;
        if(value === "Sort from the latest"){
            this.setState(this.state.books.sort(this.compareByIdDesc))  
        }
        else if(value === "Sort from the earliest"){
            this.setState(this.state.books.sort(this.compareByIdAsc))  
        }
        else if(value === "Sort by average rate"){
            this.setState(this.state.books.sort(this.compareByAverageRate))
        }
        else{
            this.setState(this.state.books.sort(this.compareByPopularity))
        }  
    }

    compareByIdDesc(a,b){
        let comparison = 0
        if(a.id < b.id){
            comparison = 1
        }
        else if (a.id > b.id){
            comparison = -1
        }
        return comparison
    }

    compareByIdAsc(a,b){
        let comparison = 0
        if(a.id > b.id){
            comparison = 1
        }
        else if (a.id < b.id){
            comparison = -1
        }
        return comparison
    }

    compareByAverageRate(a,b){
        let comparison = 0
        if(a.avg_rate < b.avg_rate){
            comparison = 1
        }
        else if (a.avg_rate > b.avg_rate){
            comparison = -1
        }
        return comparison
    }

    compareByPopularity(a,b){
        let comparison = 0
        if(a.amountOfRatings < b.amountOfRatings){
            comparison = 1
        }
        else if (a.amountOfRatings > b.amountOfRatings){
            comparison = -1
        }
        return comparison
    }

     handleCategories(categories){
        this.setState({categories: categories})
        let newArray = []
        for (let i = 0; i < this.state.books.length; i++) {
            for (let j = 0; j < categories.length; j++) {
                if(this.state.books[i].category === categories[j]){
                    newArray.push(this.state.books[i])
                }              
            }           
        }
        this.setState({selectedBooks: newArray})
        if(categories.includes("ALL")){
            this.setState({selectedBooks: this.state.books})
        } 
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Books List</h2>
                <div className="row form-group" style={{margin: "0 0 15px 30px"}}>
                    <button className="btn btn-primary inputs" onClick={this.addBook} >Add Book</button>
                    <select className="form-control inputs select" style={{marginTop: '15px'}} onChange={this.changeArray}>
                        <option name="the oldest">Sort from the latest</option>
                        <option name="the earliest" >Sort from the earliest</option>
                        <option name="average rate">Sort by average rate</option>
                        <option name="popularity">Sort by popularity</option>
                    </select>
                </div>
                {this.state.loaded &&
                    <SelectCategories onSelectCategories={this.handleCategories}></SelectCategories>
                }
                
                <div className="row" style={{margin: "0 30px 0 30px"}}>
                    <table className="table table-striped table-bordered" >
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Average rate</th>
                                <th>Your rate</th>
                                <th>Add/Change rate</th>
                                {isAdmin() && 
                                    <th>Action</th>
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {
                               this.mapBooks(this.state.selectedBooks).map(book => 
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category}</td>
                                        <td>{book.avg_rate}</td>
                                        <td>{book.user_rate}</td>
                                        <td>
                                            <Slider value={book.user_rate} id={book.id}></Slider>
                                        </td>
                                        {isAdmin() && 
                                            <td>
                                                <button className="btn btn-warning" style={{marginRight:"15px"}} type="submit" 
                                                onClick={() => this.updateBook(book.id)}>Update</button>  

                                                <button className="btn btn-danger" type="submit" 
                                                onClick={() => this.deleteBook(book.id)}>Delete</button> 
                                            </td>
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <button className="btn btn-primary inputs" onClick={this.addBook} >Add Book</button>
                </div> 
            </div>
        );
    }
}

export default BooksPage;