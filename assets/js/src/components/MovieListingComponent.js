import React from "react";

function MovieListingComponent(props) {
  return (
    <div className="d-flex h-100 text-center text-white bg-dark">
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header class="mb-auto">
          <div>
            <nav class="nav nav-masthead justify-content-center float-md-end">
              <a class="nav-link active" aria-current="page" href="#">
                IMDB ID
              </a>
              <a class="nav-link" href="#">
                Release Date
              </a>
              <a class="nav-link" href="#">
                RunTime
              </a>
            </nav>
          </div>
        </header>

        <main class="px-3">
          <h1>Movie Title</h1>
          <p class="lead">
           Plot Description
          </p>
          <p class="lead">
            <a
              href="#"
              class="btn btn-lg btn-secondary fw-bold border-white bg-white"
            >
             Delete From Database
            </a>
          </p>
        </main>
      </div>
    </div>
  );
}

export default MovieListingComponent;
