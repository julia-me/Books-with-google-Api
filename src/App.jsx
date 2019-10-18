import React, {useState, useEffect} from 'react';
import './App.css';
import Book from './Components/Books/Book'
import ShowBook from './Components/ShowBook/ShowBook'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import BookService from './services/BookService';
const bookService = new BookService();


function App () {
  const [books, setBooks] = useState([])
  const [favBooksArr, setFavBooks] = useState(JSON.parse(localStorage.getItem('favBooksArr')) ? JSON.parse(localStorage.getItem('favBooksArr')) : [])
  const [currentBook, setCurrentBook] = useState({...books[0]})
  const [loading, setLoading] = useState(true)
  const [inputVal, setInputValue] = useState('')
  const [selectVal, setSelectVal] = useState('1')
  const [fav, satFav] = useState(true)


  useEffect(() => { 
    bookService.getBooksByName(`${inputVal || 'bunny'} `, selectVal).then(res => {
      setBooks(res.data.items)
      setLoading(false)
      console.log(fav)
    })
  }, [selectVal, favBooksArr])

  const getBooksByNameHandle =() => {
    bookService.getBooksByName(inputVal, selectVal).then( res => {
      setBooks(res.data.items)
    })
  }

  const showBooks = books.map((book, index)=> {
    book= book.volumeInfo
    return <Book key= {book.title+ index + book.infoLink} data={book} setCurrentBook={setCurrentBook} btnTitle={'add to favourite'} action={'add'} favBooksArr={favBooksArr} setFavBooks={setFavBooks} setBooks={setBooks}satFav={satFav}/>
  })

  const showFavBooks = favBooksArr.map( (book, index)=> {
    return <Book  key= {book.title+ index + book.publishedDate} data={book} setCurrentBook={setCurrentBook} btnTitle={'remove from favourite'} action={'remove'} fav={fav} satFav={satFav} favBooksArr={favBooksArr} setFavBooks={setFavBooks} setBooks={setBooks}/>
  })

  const loadingHeandle = () => {
    return(
      <div>
        <p className="loading"> Loading ....</p>
        <img src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif" alt=""/>
      </div>
    )
  }

  const notActive = () => {
    satFav(true);
  }

  const isActive = () => {
    satFav(false);
  }

  return (
    <Router>
      <div className="App">
        <ul className="header">
          <li>
            <Link to='/' onClick={(e)=> notActive()}> Home Page </Link>
          </li>
          <li>
            <Link to='/Favourite' onClick={(e)=> isActive()}> Favourite books</Link>
          </li>
        </ul>
        <Route exact path="/">
          <h1 className='main-title'> BOOKS PAGE </h1>
          <div className="books-search">
            <input type="text" placeholder="enter name " onChange={(e) => setInputValue(e.target.value)}/>
            <label htmlFor="selectPage"> choose a page</label>
            <select id="selectPage" onChange={(e) => setSelectVal(e.target.value)} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button onClick={getBooksByNameHandle}> find book </button>
          </div>
          {loading && loadingHeandle()}
          {showBooks}
          {!loading && showFavBooks}
        </Route>
        <Route exact path="/Favourite">
          <h1 className='main-title'> FAVOURITE BOOKS  </h1>
          {showFavBooks}
        </Route>
        <Route path="/book">
          < ShowBook currentBook={currentBook} />
        </Route>
    </div>
  </Router>
  )
}




export default App;


