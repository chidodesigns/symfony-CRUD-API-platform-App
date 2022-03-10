import React from "react";

function MovieListingSearchResultsComponent(props) {
  return (
    <div className="card" style={{width: '18rem'}}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Movie title</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Movie Description:</li>
        <li className="list-group-item">Movie ID:</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">
          View Movie
        </a>
      </div>
    </div>
  );
}

export default MovieListingSearchResultsComponent;
