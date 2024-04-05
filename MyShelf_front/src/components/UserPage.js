import React, { Component } from "react";

import UserService from "../services/UserService";
import BookService from "../services/BookService";

export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      books: []
    };
  }

  componentDidMount() {
    UserService.getUserPage().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content: error.response.data.error
        });
      }
    );

    BookService.getAllBooks().then(
      response => {
        this.setState({
          books: response.data
        })
      }
    )
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <div>
            <h4>Books:</h4>
            <ul>
              {this.state.books.map(book => (
                <li key={book.id}>
                  <strong>Title:</strong> {book.title}, <strong>Author:</strong> {book.author}
                </li>
              ))}
            </ul>
          </div>
        </header>
      </div>
    );
  }  
}
