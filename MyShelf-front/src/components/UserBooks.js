import React, { Component } from 'react';
import BookService from "../services/BookService";

class UserBooks extends Component {

    constructor(props){
        super(props)

        this.state={
            userId: this.props.match.params.id,
            userBooks: [],
            loaded:false
        }
    }

    componentDidMount(){
        BookService.getUserBooks(this.state.userId).then(
            response => {
              this.setState({
                userBooks: response.data,
                loaded:true
              })
            }
          )
    }

    render() {
        return (
            <div>
                <h2 className="text-center" style={{marginBottom:"30px"}}>Your added books</h2>
                {this.state.loaded && 
                <div>
                    {this.state.userBooks.length === 0 ?(
                        <div className="alert alert-danger"  role="alert">
                            You have not added any books
                        </div>) :(
                        <div className="row" style={{margin: "0 30px 0 30px"}}>
                        <table className="table table-striped table-bordered" >
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Average rate</th>
                                    <th>Amount of rating</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.userBooks.map(book => 
                                        <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.category}</td>
                                            {book.amountOfRatings === 0 ?
                                                <td>-</td> :
                                                <td>{book.avg_rate}</td>
                                            }                                       
                                            <td>{book.amountOfRatings}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div> 
                        )
                    }
                    </div>              
                }   
            </div>
        );
    }
}

export default UserBooks;