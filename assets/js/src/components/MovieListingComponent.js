import React from "react";
import classes from './MovieListingComponent.module.css'

function MovieListingComponent(props) {
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
          {props.addToDb && <button className="btn btn-outline-light" type="button">Add To Database</button>}
          <p>IMDB ID:{props.id}</p>
        </div>
      </div>
      <div class="col-md-6">
        <div className={`h-100 p-5 bg-light border rounded-3 movie_listing_img_holder d-flex justify-content-center`}>
          <img src={props.image} className="movie-listing-img"/>
        </div>
      </div>
    </div>
  );
}

export default MovieListingComponent;
