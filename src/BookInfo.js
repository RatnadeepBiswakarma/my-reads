// I'll be working on this function at a later time


import React, { Component } from "react";


class BookInfo extends Component {
  books = this.props.books;
  render() {
    return (
      <div className="container">
      {console.log(this.books)}
        <main>
          <div className="book_overview">
            <div>
              {/* <img src={this.books.imageLinks.thumbnail} /> */}
              <h1> {console.log(this.books)} </h1>
              <p>{this.books.subTitle}</p>
              <h4> {this.books.authors} </h4>
              <p> Average Rating: {this.books.averageRating} </p>
              <p> {this.books.description}</p>
            </div>
          </div>
          <div />
          <div className="book_details">
            <h1> </h1>
          </div>
        </main>
      </div>
    );
  }
}
export default BookInfo;
