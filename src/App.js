import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
// import WantToRead from "./WantToRead.js";
// import Read from "./Read.js";
// import Reading from "./Reading.js";
import { Route } from "react-router-dom";
import SearchBooks from "./components/search-page/SearchBooks.js";
import { Link } from "react-router-dom";
import Loader from "./loader/Loader.js";
import Shelf from "./components/shelf/Shelf";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      booksLoaded: false,
      showSearchPage: false,
      query: "",
      booksToDisplay: []
    };
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }
  // to fetch all the books and then store to the local array
  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        let tempReading = books.filter(
          item => item.shelf === "currentlyReading"
        );
        let tempWillRead = books.filter(item => item.shelf === "wantToRead");
        let tempRead = books.filter(item => item.shelf === "read");

        this.setState({
          books,
          wantToRead: tempWillRead,
          currentlyReading: tempReading,
          read: tempRead
        });
        this.setState({ booksLoaded: true });
      })
      .catch(err => console.log(err));
  }
  // browser reload will be called after the book shelf is changed
  reloadBooks() {
    if (window.confirm("Bookshelf updated do you want to reload?")) {
      window.location.reload();
    }
  }
  // network request will be made to update the book shelf in the server
  updateBookShelf(shelf, book, newAddition, currentShelf) {
    if (shelf === "currentlyReading") {
      book.shelf = shelf
      this.setState({
        currentlyReading: this.state.currentlyReading.concat(book)
      });
    } else if (shelf === "read") {
      book.shelf = shelf
      this.setState({
        read: this.state.read.concat(book)
      });
    } else if (shelf === "wantToRead") {
      book.shelf = shelf
      this.setState({
        wantToRead: this.state.wantToRead.concat(book)
      });
    }
    if (!newAddition) {
      let remainedBooks = this.state[currentShelf].filter(
        item => item.id !== book.id
      );
      if (currentShelf === "currentlyReading") {
        this.setState({ currentlyReading: remainedBooks });
      } else if (currentShelf === "read") {
        this.setState({ read: remainedBooks });
      } else if (currentShelf === "wantToRead") {
        this.setState({ wantToRead: remainedBooks });
      }
    }
    BooksAPI.update(book, shelf)
      .then(() => {})
      .catch(err => console.log(`Error occurred while changing shelf ${err}`));
  }
  // handleBookAddition(shelf, book, currentShelf) {
  //   if (shelf === "currentlyReading") {
  //     this.setState({
  //       books: this.state.books.concat(book),
  //       currentlyReading: this.state.currentlyReading.concat(book)
  //     });
  //   }
  //   if (shelf === "wantToRead") {
  //     this.setState({
  //       books: this.state.books.concat(book),
  //       wantToRead: this.state.wantToRead.concat(book)
  //     });
  //   }
  //   if (shelf === "read") {
  //     this.setState({
  //       books: this.state.books.concat(book),
  //       read: this.state.read.concat(book)
  //     });
  //   }
  // }

  render() {
    return this.state.booksLoaded ? (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {/* components are rendered from here */}
                <Shelf
                  handleSelection={this.updateBookShelf}
                  books={this.state.currentlyReading}
                  shelfTitle="Currently Reading"
                  shelf="currentlyReading"
                />
                <Shelf
                  handleSelection={this.updateBookShelf}
                  books={this.state.wantToRead}
                  shelfTitle="Want To Read"
                  shelf="wantToRead"
                />
                <Shelf
                  handleSelection={this.updateBookShelf}
                  books={this.state.read}
                  shelfTitle="Complete Reading"
                  shelf="read"
                />
              </div>
              <div className="open-search">
                <Link to="/search">Add Book</Link>
              </div>
            </div>
          )}
        />
        <Route
          clickHandler={(book, read) => {
            BooksAPI.update(book, read);
          }}
          exact
          path="/search"
          render={props => (
            <SearchBooks
              {...props}
              updateBookShelf={this.updateBookShelf}
              library={this.state.books}
            />
          )}
        />
        <div className="coder">
          Coded with <span className="heart">♥</span> by Ratnadeep
        </div>
      </div>
    ) : (
      <Loader />
    );

    //
  }
}

export default BooksApp;
