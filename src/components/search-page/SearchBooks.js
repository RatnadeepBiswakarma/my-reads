// Plan:
// books are fetched from the server and then stored in a array and then as per command they are stored back to the server with their respective shelves and window reload is invoked
import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";
// import "./App.css";
import { Link } from "react-router-dom";

class SearchBooks extends Component {
  state = {
    books: [],
    library: [],
    query: ""
  };
  lastAPICall = null;
  fetchHistory = [];
  storedBook = "";
  // fetching books with the the query inputted by user
  getBooks = () => {
    clearTimeout(this.lastAPICall); // if user keeps typing then cancel the api request
    if (this.state.query !== "") {
      this.setState({ books: [] });
      this.lastAPICall = setTimeout(() => {
        this.fetchHistory.push(this.state.query);
        BooksAPI.search(this.state.query) // api call to the server
          .then(books => {
            if (
              this.fetchHistory[this.fetchHistory.length - 1] ===
              this.state.query
            ) {
              this.setState({ books });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, 100); // network request delayed to avoid errors
    }
  };
  // option selection for the book shelf is handled in this function
  handleSelection(shelf, book, newAddition, currentShelf) {
    console.log(currentShelf)
    this.props.updateBookShelf(shelf, book, newAddition, currentShelf);
    this.props.history.push("/")
  }
  // text input event handling function
  handleChange(event) {
    this.setState({ query: event.target.value });
  }
  // keyup handling function
  handleKeyUp(e) {
    if (e.which !== 8 && e.which !== 13) {
      if (e.target.value !== "") {
        this.getBooks();
      }
    }
    if (this.state.query === "") {
      this.setState({ books: {} });
    }
  }
  // submit function handler
  handleSubmit = e => {
    if (this.state.query !== "") {
      this.getBooks();
    }
    e.preventDefault();
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Back
          </Link>
          <div className="search-books-input-wrapper">
            <form
              title="Search"
              className="search-from"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <input
                autoFocus={true}
                className="input-field"
                onChange={this.handleChange.bind(this)}
                onKeyUp={this.handleKeyUp.bind(this)}
                type="text"
                placeholder="Search by title or author"
              />
              <button
                className="submit-btn"
                onSubmit={this.handleSubmit.bind(this)}
                type="button"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books.length > 0 && (
            <ol className="books-grid">
              {this.state.books.map(book => {
                let url;
                book.imageLinks
                  ? (url = book.imageLinks.smallThumbnail)
                  : (url = "");
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${url})`
                          }}
                        />
                        {/* option menu check mark function starts from here */}
                        <div className="book-shelf-changer">
                          {this.props.library.find(
                            item => item.id === book.id
                          ) !== undefined ? (
                            <div>
                              {this.props.library
                                .filter(item => {
                                  return item.id === book.id;
                                })
                                .map(item => {
                                  return (
                                    <select
                                      key={item.id}
                                      defaultValue="move"
                                      onChange={event => {
                                        this.handleSelection(
                                          event.target.value,
                                          book,
                                          false,
                                          item.shelf,
                                        );
                                      }}
                                    >
                                      <option value="move" disabled>
                                        Move to...
                                      </option>
                                      <option value="currentlyReading">
                                        {item.shelf === "currentlyReading"
                                          ? "Currently Reading   🗸"
                                          : "Currently Reading"}
                                      </option>
                                      <option value="wantToRead">
                                        {item.shelf === "wantToRead"
                                          ? "Want to Read   🗸"
                                          : "Want to Read"}
                                      </option>
                                      <option value="read">
                                        {item.shelf === "read"
                                          ? "Read   🗸"
                                          : "Read"}
                                      </option>
                                      <option value="none">None</option>
                                    </select>
                                  );
                                })}
                            </div>
                          ) : (
                            <select
                              defaultValue="move"
                              onChange={event => {
                                this.handleSelection(
                                  event.target.value,
                                  book,
                                  true
                                );
                              }}
                            >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">Not Added 🗸</option>
                            </select>
                          )}
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
          )}
          {this.state.books.error && (
            <div>
              <p
                style={{
                  fontSize: 16,
                  textAlign: "center"
                }}
              >
                Your query does not match any book.
              </p>
            </div>
          )}
          {this.state.query === "" && (
            <div>
              <p
                style={{
                  fontSize: 16,
                  textAlign: "center"
                }}
              >
                Why don't you search for cool books ??
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
