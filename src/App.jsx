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

  // useEffect(() => {
  //   axios.get("https://www.googleapis.com/books/v1/volumes?q=quilting=1:keyes&key=AIzaSyCcwNc_KhJYS3LQwzvEpRXHB3m4pMGeo_U").then(res => {
  //   const tenBooks =  res.data.items 
  //     setBooks(tenBooks)
  //   })
  // },[])

  useEffect(() => {
    let res = async () => { 
      for( let i = 1; i<= 2; i++){
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=quilting=${i}:keyes&key=AIzaSyCcwNc_KhJYS3LQwzvEpRXHB3m4pMGeo_U`).then(res => {
          const tenBooks =  res.data.items 
            setBooks([...books, ...tenBooks])
        })
      }
    }
    res()
  },[])

  const showBooks = books.map( book=> {
    book= book.volumeInfo
    return <Book key= {book.title} data={book} setCurrentBook={setCurrentBook} />
  })

  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <h1 className='main-title'> BOOKS PAGE </h1>
          {console.log(books)}
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


