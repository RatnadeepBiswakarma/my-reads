import React, { Component } from "react";

class Shelf extends Component {
  books = this.props.books;
  shelfTitle = this.props.shelfTitle;
  shelf = this.props.shelf;

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.books
                .filter(item => item.shelf === this.shelf)
                .map(book => {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.smallThumbnail
                              })`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              defaultValue={book.shelf}
                              onChange={event =>
                                this.props.handleSelection(event, book)
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
                        <div className="book-authors">
                          Pages: {book.pageCount}
                        </div>
                        <div className="book-authors">
                          Published by: {book.publisher} on {book.publishedDate}
                        </div>
                      </div>
                    </li>
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
