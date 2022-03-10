import React, { useRef, useContext, useEffect, useState } from "react";
import MovieListingSearchResultsComponent from "../components/MovieListingSearchResultsComponent";
import AppContext from "../store/app-context";

function MovieSearchResultsPage() {
  const appInfoContext = useContext(AppContext);
  const { movieListings, AppStateMessage } = appInfoContext;

  console.log(movieListings)

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  
    if(movieListings.length > 0 || AppStateMessage){
       setIsLoading(false)
    }
    return () => {
      setIsLoading(true);
    };
  }, [movieListings, AppStateMessage])

  if(isLoading){
    return (
      <section>
        <p>Loading....</p>
      </section>
    )
  }

  if (AppStateMessage !== null) {
    return <h1>{AppStateMessage}</h1>;
  }

  return (
    <div className="row mt-4 pb-5 mb-5">
      {movieListings.length > 0 &&
        movieListings.map((movie) => <MovieListingSearchResultsComponent title={movie.title} key={movie.id} image={movie.image} desc={movie.description } movieId={movie.id}/>)}
    </div>
  );
}

export default MovieSearchResultsPage;
