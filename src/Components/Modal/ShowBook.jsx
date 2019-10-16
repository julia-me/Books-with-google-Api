import React from 'react';
import './ShowBook.scss'
import ButtonElem from '../../Elements/ButtonElem'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './Slider.scss'
import { Link } from 'react-router-dom';


const ShowBook =(props) => {
    const {
        title,
        authors,
        pageCount,
        imageLinks,
        averageRating,
        ratingsCount,
        categories,
        description,
        industryIdentifiers,
        language,
        printType,
        publishedDate,
        publisher,
        infoLink,
    } = props.currentBook;

    // const [showImg, setShowImg]=useState(true)

    const imgArr =[]
    const imgs = () => {
        for (let keys in imageLinks) {
            imgArr.push(imageLinks[keys])
        }
    }
    imgs()

    return (
        <div className="book">
                <Link to='/'> 
                    <ButtonElem  clasBtn={"book-content-close-btn"}> go to Main Page</ButtonElem> 
                </Link>
                <h1> Book: {title} </h1>
                {imageLinks &&  
                <Slider>
                    {imgArr.map((img, index) => <div key={index}>
                        <img src={img} alt="book1"/>
                    </div>)}
                </Slider>}


                {/* {imageLinks && 
                <div className="book-content-slider">
                    <ButtonElem onClickHendle={()=> setShowImg(!showImg)}> prev</ButtonElem >
                {showImg && <img src={imageLinks.smallThumbnail} alt="book1"/>}
                {!showImg && <img src={imageLinks.thumbnail} alt="book2"/> }
                    <ButtonElem onClickHendle={()=> setShowImg(!showImg)}> next</ButtonElem>
                </div>}                              */}

                {authors &&        <p> Author: {authors.join(', ')} </p>}
                {pageCount &&      <p> Pages: {pageCount} pg. </p>}
                {averageRating &&  <p> Rating: {averageRating}  </p>}
                {ratingsCount &&   <p> ratings count: {ratingsCount}  </p>}
                {industryIdentifiers && 
                            <ul>
                                <p> industry identifiers: </p>
                                {industryIdentifiers.map((ident, index) => {
                                    return <li key={index+ident.identifier}> type: {ident.type}, number: {ident.identifier} </li>
                                })}
                            </ul>
                }
                {categories &&    <p> Categories: {categories}  </p>}
                {description &&   <p> description: {description}  </p>}
                {language &&      <p> language: {language} </p>}
                {printType &&     <p> printType: {printType} </p>}
                {publishedDate && <p> published date: {publishedDate} </p>}
                {publisher &&     <p> publisher: {publisher} </p> }
                {infoLink &&     <p> Info: <a href={infoLink} className="book-info"> {infoLink} </a> </p> }
        </div>
    )
}

export default ShowBook

