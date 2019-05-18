import React, { Component } from "react";

class BookSmallPreview extends Component {
  convertShelf(shelf) {
    if (shelf === "currentlyReading") {
      return "Currently Reading";
    } else if (shelf === "wantToRead") {
      return "Want to Read";
    } else if (shelf === "read") {
      return "Read";
    }
    return "";
  }
  render() {
    return (
      <div
        className="preview-container"
        onClick={() => {
          let b = document.querySelector(`#${this.props.book.id}`);
          this.props.hideDropdown();
          window.scrollTo(0, b.offsetTop);
          b.classList.add("animate");
          setTimeout(() => {
            b.classList.remove("animate");
          }, 2000);
        }}
      >
        <img
          src={this.props.book.imageLinks.smallThumbnail}
          className="book-cover-small"
        />
        <div className="book-info-small">
          <p>{this.props.book.title}</p>
          <small>{this.convertShelf(this.props.book.shelf)}</small>
        </div>
      </div>
    );
  }
}
export default BookSmallPreview;
