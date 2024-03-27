import React, { Component } from "react";
import AdminService from "../services/AdminService";
import isAdmin from "../services/isAdmin"

export default class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      books: []
    };
    this.acceptBook = this.acceptBook.bind(this)
    this.rejectBook = this.rejectBook.bind(this)
  }

  componentDidMount() {
    AdminService.getAllBooksToAccept().then(
      response => {
        this.setState({
          books: response.data
        });
      },
      () => {
        this.setState({
          books: []
        });
      }
    )
  }


  acceptBook(id){
    AdminService.acceptBook(id);
    window.location.reload(false);
  }

  rejectBook(id){
    AdminService.rejectBook(id);
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        {!isAdmin() ? (
          <div className="alert alert-danger" role="alert">
             You are forbidden to this page
          </div>
        ): (
          <div> 
            <h2 className="text-center">Books To Accept</h2>
            <div className="row" style={{margin: "0 30px 0 30px"}}>
              <table className="table table-striped table-bordered" >
                  <thead>
                      <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Username</th>
                          <th>Accept Or Reject</th>
                      </tr>
                  </thead>

                  <tbody>{
                          this.state.books.map(book => 
                              <tr key={book.id}>
                                  <td>{book.title}</td>
                                  <td>{book.author}</td>
                                  <td>{book.userName}</td>
                                  <td>
                                    <button className="btn btn-success" style={{marginRight: "15px"}} type="submit" onClick={() => this.acceptBook(book.id)}>Accept</button> 
                                    <button className="btn btn-danger" type="submit" onClick={() => this.rejectBook(book.id)}>Reject</button>     
                                  </td>
                              </tr>
                          )
                    }
        

                  </tbody>
              </table>
          </div> 
      </div>)
     
        
    }
  </div>)}
}

