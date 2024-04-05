import React, { Component } from "react";
import AdminService from "../services/AdminService";
import ReportService from "../services/ReportService";
import isAdmin from "../services/isAdmin"

export default class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.match.params.task,
      content: "",
      books: [],
      reports: [],
      column1: "",
      column2: "",
      column3: "",
      column4: "",
    };
    this.acceptBook = this.acceptBook.bind(this)
    this.rejectBook = this.rejectBook.bind(this)
    this.getTitle = this.getTitle.bind(this)
  }

  componentDidMount() {
    if(this.state.task === "accept"){
      this.setState({
        column1: "Title",
        column2: "Author",
        column3: "Username",
        column4: "Accept Or Reject"
      });
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
    else if(this.state.task === "reports"){
      this.setState({
        column1: "Description",
        column2: "Suggested changes",
        column3: "Username",
        column4: "Action"
      });
      AdminService.getAllReports().then(
        response => {
          this.setState({
            reports: response.data
          });
        },
        () => {
          this.setState({
            reports: []
          });
        }
      )
    }
  }

  acceptBook(id){
    AdminService.acceptBook(id);
    window.location.reload(false);
  }

  rejectBook(id){
    AdminService.rejectBook(id);
    window.location.reload(false);
  }

  acceptReport(id){
    ReportService.acceptReport(id);
    window.location.reload(false);
  }

  rejectReport(id){
    ReportService.rejectReport(id);
    window.location.reload(false);
  }

  getTitle(){
    if(this.state.task === "accept") return <h2 className="text-center">Books To Accept</h2>
    else return <h2 className="text-center">Reports from users</h2>
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
            {this.getTitle()}
            <div className="row" style={{margin: "0 30px 0 30px"}}>
              <table className="table table-striped table-bordered" >
                  <thead>
                      <tr>
                          <th>{this.state.column1}</th>
                          {this.state.task === "reports" && <th>Current data</th>}
                          <th>{this.state.column2}</th>
                          <th>{this.state.column3}</th>
                          <th>{this.state.column4}</th>
                      </tr>
                  </thead>

                  <tbody>{this.state.task === "accept" && this.state.books.map(book => 
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.userName}</td>
                                <td>
                                  <button className="btn btn-success" style={{marginRight: "15px"}} type="submit" onClick={() => this.acceptBook(book.id)}>Accept</button> 
                                  <button className="btn btn-danger" type="submit" onClick={() => this.rejectBook(book.id)}>Reject</button>     
                                </td>
                              </tr>
                          )}

                          {this.state.task === "reports" && this.state.reports.map(report => 
                            <tr key={report.id}>
                                <td>{report.description}</td>
                                <td>{report.bookTitle}, {report.bookAuthor}, {report.bookCategory}</td>
                                <td>{report.suggestedTitle}, {report.suggestedAuthor}, {report.suggestedCategory}</td>
                                <td>{report.username}</td>
                                <td>
                                  <button className="btn btn-success" style={{marginRight: "15px"}} type="submit" onClick={() => this.acceptReport(report.id)}>Accept</button> 
                                  <button className="btn btn-danger" type="submit" onClick={() => this.rejectReport(report.id)}>Reject</button>     
                                </td>
                              </tr>
                          )}
                  </tbody>
              </table>
          </div> 
      </div>)
     
        
    }
  </div>)}
}

