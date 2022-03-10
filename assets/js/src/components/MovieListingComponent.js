import React, { useRef, useContext, useEffect, useState } from "react";
import AppContext from "../store/app-context";
import './MovieListingComponent.module.css'

function MovieListingComponent(props) {

  const appInfoContext = useContext(AppContext);

  const movieDtoToAddToDB = {
    imdbId: props.imdbId,
    title: props.title,
    image: props.image,
    keywords: props.keywords,
    runtime: props.runtime,
    releaseDate: props.releaseDate 
  }

  console.log(movieDtoToAddToDB)

  const addToDatabaseHandler = () => {
    appInfoContext.addMovieToDatabase(movieDtoToAddToDB)
  }

  return (

    <div className="row align-items-md-stretch">
      <div className="col-md-6">
        <div className="h-100 p-5 text-white bg-dark rounded-3">
          <h2>{props.title}</h2>
          {props.plot &&
          <p>{props.plot}</p>
          }
          <hr/>
          <p>Runtime: {props.runtime} mins</p>
          <p>Release Date: {props.releaseDate}</p>
          <p>Keywords: {props.keywords}</p>
          <p>IMDB ID:{props.imdbId}</p>
          {props.addToDb && <button className="btn btn-outline-light" type="button" onClick={addToDatabaseHandler}>Add To Database</button>}
        
        </div>
      </div>
      <div className="col-md-6">
        <div className={`h-100 p-5 bg-light border rounded-3 movie_listing_img_holder d-flex justify-content-center`}>
          <img src={props.image} className="movie-listing-img"/>
        </div>
      </div>
    </div>
  );
}

export default MovieListingComponent;
