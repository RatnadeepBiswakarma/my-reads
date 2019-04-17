import React, { Component } from "react";

class Book extends Component {
  render() {
    const book = this.props.book;
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                defaultValue={book.shelf}
                onChange={event =>
                  this.props.handleSelection(
                    event.target.value,
                    book,
                    false,
                    book.shelf
                  )
                }
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">
                  {this.shelf === "currentlyReading"
                    ? "Currently Reading 🗸"
                    : "Currently Reading"}
                </option>
                <option value="wantToRead">
                  {this.shelf === "wantToRead"
                    ? "Want to Read 🗸"
                    : "Want to Read"}
                </option>
                <option value="read">
                  {this.shelf === "read" ? "Read 🗸" : "Read"}
                </option>
                <option value="none">Remove Book</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            <strong>V: </strong>
            {book.contentVersion}
          </div>
          <div className="book-authors">{book.authors}</div>
          <div className="book-authors">Pages: {book.pageCount}</div>
          <div className="book-authors">
            Published by: {book.publisher} on {book.publishedDate}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
