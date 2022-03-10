import React, { useRef, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MovieListingComponent from '../components/MovieListingComponent'
import AppContext from "../store/app-context";

function MovieListingPage({match}) {
    const history = useHistory();
    const imdbId = match.params.id;
    const appInfoContext = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(true);

    const {movieInDB, movieFrom3rdPartyApi, singleMovieListing, errorMessage, AppStateMessage} = appInfoContext
  
    useEffect(() => {

        if(!movieInDB){
            appInfoContext.getMovieFromThirdPartyApi(imdbId)
            setIsLoading(false)
        }

        return () => {
            setIsLoading(true);
          };

    }, [])

    if(isLoading){
        return (
          <section>
            <p>Loading....</p>
          </section>
        )
      }
  

    return (
        <div className='my-4'>
            <MovieListingComponent image={singleMovieListing.image} title={singleMovieListing.title}plot={movieFrom3rdPartyApi == true ? singleMovieListing.plot : false} addToDb={movieFrom3rdPartyApi == true ? true : false} runtime={singleMovieListing.runtimeMins} releaseDate={singleMovieListing.releaseDate} keywords={singleMovieListing.keywords} imdbId={singleMovieListing.id}/>
        </div>
        )
        
}

export default MovieListingPage