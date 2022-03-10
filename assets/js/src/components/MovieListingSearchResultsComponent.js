import React from "react";

function MovieListingSearchResultsComponent(props) {
  return (
    <div class="card" style={{width: '18rem'}}>
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Movie title</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Movie Description:</li>
        <li class="list-group-item">Movie ID:</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">
          View Movie
        </a>
      </div>
    </div>
  );
}

export default MovieListingSearchResultsComponent;
