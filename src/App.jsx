import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Book from './Components/Books/Book'
import ShowBook from './Components/Modal/ShowBook'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App () {
  const [books, setBooks] = useState([])
  const [currentBook, setCurrentBook] = useState({...books[0]})
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   axios.get("https://www.googleapis.com/books/v1/volumes?q=quilting=1:keyes&key=AIzaSyCcwNc_KhJYS3LQwzvEpRXHB3m4pMGeo_U").then(res => {
  //   const tenBooks =  res.data.items 
  //     setBooks(tenBooks)
  //   })
  // },[])

  useEffect(() => {
    let res = async () => { 
      let tenBooks = [];
      for( let i = 12; i <= 13; i++){   
        const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=quilting=${i}:keyes&key=AIzaSyCcwNc_KhJYS3LQwzvEpRXHB3m4pMGeo_U`)
        tenBooks = [...tenBooks, ...result.data.items] 
      }
      setBooks([...books, ...tenBooks])
      setLoading(false)
    }
    res()
  },[])

  const showBooks = books.map( book=> {
    book= book.volumeInfo
    return <Book key= {book.title+ book.categories+ book.infoLink} data={book} setCurrentBook={setCurrentBook} />
  })

  const loadingHeandle = () => {
    return(
      <div>
        <p className="loading"> Loading ....</p>
        <img src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif" alt=""/>
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <h1 className='main-title'> BOOKS PAGE </h1>
          {console.log(books)}
          {loading && loadingHeandle()}
          {showBooks}
        </Route>
        <Route path="/book">
          < ShowBook currentBook={currentBook}/>
        </Route>
    </div>
  </Router>
  )
}




export default App;


