import React from "react";
import {Link} from "react-router-dom";

function MovieListingSearchResultsComponent(props) {
  return (
    <div className="card col-md-3 p-2 my-2">
      <img src={props.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Movie Description: {props.desc}</li>
        <li className="list-group-item">Movie ID: {props.movieId}</li>
      </ul>
      <div className="card-body">
        <Link to={`/movie-listing/${props.movieId}`} className="card-link">
          View Movie
        </Link>
      </div>
    </div>
  );
}

export default MovieListingSearchResultsComponent;
