import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
// import WantToRead from "./WantToRead.js";
// import Read from "./Read.js";
// import Reading from "./Reading.js";
import { Route } from "react-router-dom";
import SearchBooks from "./components/search-page/SearchBooks.js";
import { Link } from "react-router-dom";
import Loader from './loader/Loader.js';
import Shelf from './components/shelf/Shelf';

class BooksApp extends React.Component {
  state = {
    books: [],
    booksLoaded: false,
    showSearchPage: false,
    query: '',
    booksToDisplay: []
  };
  // to fetch all the books and then store to the local array
  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
        this.setState({ booksLoaded: true });
        // console.log(this.state.books);
      })
      .catch(err => console.log(err));
  }
  // browser reload will be called after the book shelf is changed
  reloadBooks() {
    if (window.confirm('Bookshelf updated do you want to reload?')) {
      window.location.reload()
    };
  }
  // network request will be made to update the book shelf in the server
  updateBookShelf(event, book) {
    BooksAPI.update(book, event.target.value).then(() => {
        window.location.reload();
    }).catch(err => console.log(`Error occurred while changing shelf ${err}`));
  }
  // handleSearchInput(e) {
  //   // console.log(e.target.value, this);
  //   this.setState({query: e.target.value});
  // }
  
  render() {
    // search function for 
    // const {books, query, booksToDisplay} = this.state;
    // // let booksToDisplay;
    // let matchedBooks = [];
    // if (query === '') {
    //   if (booksToDisplay.length !== books.length) {
    //     this.setState({booksToDisplay: books});
    //   }
    // } else {
    //   matchedBooks = books.filter(book => {
    //   book.title.toLowerCase().trim().includes(query);
    //   });
    //   if (matchedBooks.length !== booksToDisplay.length) {
    //     this.setState({booksToDisplay: matchedBooks});
    //   }
    // }
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
              {/* <div>
                <input onInput={this.handleSearchInput.bind(this)} type='text' placeholder='Search books...' id='search'/>
              </div> */}
              <div className="list-books-content">
              {/* components are rendered from here */}
                <Shelf
                  handleSelection={this.updateBookShelf}
                  books={this.state.books}
                  shelfTitle='Currently Reading'
                  shelf='currentlyReading'
                />
                <Shelf
                  handleSelection={this.updateBookShelf}
                  books={this.state.books}
                  shelfTitle='Want To Read'
                  shelf='wantToRead'
                />
                <Shelf
                  handleSelection={this.updateBookShelf}
                  books={this.state.books}
                  shelfTitle='Complete Reading'
                  shelf='read'
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
            console.log(book);
          }}
          exact
          path="/search"
          component={SearchBooks}
          library = {this.state.books}
        />
        <div className='coder'>Coded with <span className='heart'>♥</span> by Ratnadeep</div>
      </div>
    ) : (<Loader/>);

    //
  }
}


 
export default BooksApp;
