import React, { useRef, useContext, useEffect, useState } from "react";
import AppContext from "../store/app-context";

function Homepage() {

  const appInfoContext = useContext(AppContext);
  const {databaseMovieListings } = appInfoContext;
  const [isLoading, setIsLoading] = useState(true);
  console.log(databaseMovieListings)

  useEffect(() => {

    appInfoContext.getAllMoviesFromDatabase()

  }, [])

  return (
    <div>
      
      <h1 className="display-5 fw-bold text-center py-3">A List Of Movies From The Database </h1>

      <div className="card-group">

      {databaseMovieListings.length > 0 && databaseMovieListings.map((movie) => (

           <div className="card" key={movie.id}>
           <img src={movie.image} className="card-img-top" alt="..." />
           <div className="card-body">
             <h5 className="card-title">{movie.title}</h5>
             <p className="card-text">
               <small className="text-muted">IMDB ID:{movie.title}</small>
             </p>
             <p className="card-text">
               <small className="text-muted">Runtime:{movie.runtime}</small>
             </p>
             <p className="card-text">
               <small className="text-muted">Release Date:{movie.releaseDate}</small>
             </p>
             <p className="card-text">
               <small className="text-muted">Keywords:{movie.keywords}</small>
             </p>
           </div>
         </div> 
      ))} 
      

      </div>

    </div>
  );


}

export default Homepage;
