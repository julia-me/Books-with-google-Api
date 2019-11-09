import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Book.scss';

const Book =(props) => {
    const {
        title,
        authors,
        pageCount,
        imageLinks,
    } = props.data
    const {favBooksArr, setFavBooks }= props;
    const index = favBooksArr.findIndex(book => book.title === props.data.title && book.pageCount ===props.data.pageCount);
    const [btnName, setBtnName]= useState();

    const showBooklHendler  =() => {
        const {setCurrentBook} = props;
        setCurrentBook(props.data);
    }

    const whatMeDoHandler =() => {
        switch(props.action){
            case 'add':
                if(!favBooksArr.length ||  index === -1){
                    setFavBooks([...favBooksArr, props.data])
                    setBtnName(' in fav ');
                    props.satFav(true)
                }
                else{
                    setBtnName('already favourite'); 
                }
                localStorage.setItem('favBooksArr', JSON.stringify(favBooksArr));

                break;
            case 'remove':
                console.log(index)
                favBooksArr.splice(index, 1)
                localStorage.setItem('favBooksArr', JSON.stringify(favBooksArr));
                setFavBooks(JSON.parse(localStorage.getItem('favBooksArr')));
                break;
            default:
                console.log( 'default')
        }
    };

    return (
        <div className={!props.fav ? 'book-element': 'book-element border'}>
            <Link
            to={{
                pathname: `/book/${title}`,
              }}
            onClick={showBooklHendler}
            >
            <h1> {title} </h1>
            {imageLinks ? <img className="book-element-img" src={imageLinks.smallThumbnail} alt="book"/> : <div className="book-no-img">  {title} </div>  }
            <p>  {authors ?  "Author: " + authors.join(', ') : 'no author'} </p>
            <p> {pageCount ?  "Pages: " + pageCount + ' pg.' : 'no information about page count'}  </p>
            </Link>
            <button onClick={(e)=> whatMeDoHandler()} className="btn-add-to-favoutite"> {btnName ? btnName : props.btnTitle} </button>
        </div>
    );
}

export default Book

