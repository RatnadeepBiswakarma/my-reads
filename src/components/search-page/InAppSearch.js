import React, { Component } from "react";
import Book from "./../Book/Book";
import BookSmallPreview from "./../Book/BookSmallPreview.js";
import "./../search-page/searchStyles.css";

class SearchInApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      matchedBooks: [],
      enableDropdown: false
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  handleKeyUp(event) {
    this.setState({ query: event.target.value, enableDropdown: true });
    const matched = this.props.library.filter(book =>
      book.title.toLowerCase().includes(this.state.query)
    );
    if (event.target.value === "") {
      this.setState({ matchedBooks: [] });
    } else {
      this.setState({ matchedBooks: matched });
    }
  }
  hideDropdown() {
    this.setState({ enableDropdown: false });
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          width: 400
        }}
        className="in-app-search-container"
      >
        <h4
          style={{
            margin: 10,
            color: "grey",
            textAlign: "center",
            fontWeight: "normal"
          }}
        >
          Search in your shelves
        </h4>
        <input
          className="in-app-search-input"
          onInput={this.handleKeyUp}
          onFocus={() => {
            this.setState({ enableDropdown: true });
          }}
          onBlur={() => {
            // need delay to work the scroll properly
            setTimeout(() => {
              this.setState({ enableDropdown: false });
            }, 200);
          }}
          type="text"
        />
        {this.state.enableDropdown && (
          <div className="matched-books">
            {this.state.matchedBooks.map(book => {
              return (
                <BookSmallPreview
                  style={{
                    backgroundColor: "white"
                  }}
                  className="book-preview"
                  key={book.id}
                  book={book}
                  hideDropdown={this.hideDropdown}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default SearchInApp;
