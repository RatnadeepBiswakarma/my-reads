import React, { Component } from "react";
import Book from "./../Book/Book";

class Shelf extends Component {
  shelfTitle = this.props.shelfTitle;
  shelf = this.props.shelf;

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map(book => {
                return (
                  <Book
                    key={book.id}
                    book={book}
                    handleSelection={this.props.handleSelection}
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;
