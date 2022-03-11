import React, { createContext, useState } from "react";

const AppContext = createContext({
  movieListings: [],
  singleMovieListing: [],
  databaseMovieListings: [],
  searchFieldSuccess: null,
  searchFieldFailure: null,
  movieFrom3rdPartyApi: null,
  movieInDB: null,
  AppStateMessage: "",
  errorMessage: "",
  searchForMovieHandler: (searchTerm) => {},
  getMovieFromThirdPartyApiHandler: (imdb) => {},
  addMovieToDatabaseHandler: (movieDto) => {},
  getMoviesFromTheDatabaseHandler: () => {},
  deleteMovieFromTheDatabaseHandler: () => {}
});

export function AppContextProvider(props) {
  const [movieList, setMovieList] = useState([]);
  const [databaseMovieList, setDatabaseMovieList] = useState([]);
  const [singleMovie, setSingleMovie] = useState([]);
  const [searchFailed, setSearchFailed] = useState();
  const [searchSuccess, setSearchSuccess] = useState();
  const [isMovieInDb, setIsMovieInDb] = useState(false);
  const [isMovieFrom3rdParty, setIisMovieFrom3rdParty] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [appMsg, setAppMsg] = useState();
  

  function searchForMovieHandler(searchTerm) {
    //  Reset State
    setMovieList([]);
    setSearchSuccess(null);
    setAppMsg(null);

    fetch(
      `https://imdb-api.com/en/API/SearchMovie/${process.env.IMDB_API_KEY}/${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.results.length > 0) {
              setMovieList(data.results);
            } else {
              setAppMsg(
                "No movie title results with your search term:" +
                  data.expression
              );
            }
            setSearchSuccess(true);
            return;
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        error.json().then((data) => {
            console.log(error)
          setSearchFailed(true);
          setErrorMsg(data.errorMessage);
        });
      });
  }

  function getMovieFromThirdPartyApiHandler(imdbId) {
    fetch(
      `https://imdb-api.com/en/API/Title/${process.env.IMDB_API_KEY}/${imdbId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setSingleMovie(data);
            setIisMovieFrom3rdParty(true);
            return;
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        error.json().then((data) => {
          console.log(error)
          setErrorMsg(data.errorMessage);
        });
      });
  }

  function addMovieToDatabaseHandler(movieDto) {
    setIsMovieInDb(false)
    fetch(process.env.API_SERVER_URL, {
      method: "POST",
      body: JSON.stringify(movieDto),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            setIsMovieInDb(true)
            return;
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        error.json().then((data) => {
            console.log(error)
          setErrorMsg(data.errorMessage);
        });
      });
  }

  function getMoviesFromTheDatabaseHandler() {
  
    fetch(process.env.API_SERVER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
       
        if (response.ok) {
          response.json().then((data) => {
            if (data.length > 0) {
                setDatabaseMovieList((prevMovieList) => {
                  return prevMovieList = data
              });
            }
            return;
          });
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        error.json().then((data) => {
           console.log(error)
          setErrorMsg(data.errorMessage);
        });
      });
  }

  // @ Todo Finish Off Delete Function Handler
  function deleteMovieFromTheDatabaseHandler(movieId)
  {
    fetch(process.env.API_SERVER_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
         
          if (response.ok) {
            response.json().then((data) => {
              if (data.length > 0) {
                  setDatabaseMovieList((prevMovieList) => {
                    return prevMovieList = data
                });
              }
              return;
            });
          } else {
            return Promise.reject(response);
          }
        })
        .catch((error) => {
          error.json().then((data) => {
            console.log(error)
            setErrorMsg(data.errorMessage);
          });
        });
  }

  const context = {
    movieListings: movieList,
    databaseMovieListings:databaseMovieList,
    singleMovieListing: singleMovie,
    searchFieldSuccess: searchSuccess,
    searchFieldFailure: searchFailed,
    movieInDB: isMovieInDb,
    movieFrom3rdPartyApi: isMovieFrom3rdParty,
    errorMessage: errorMsg,
    AppStateMessage: appMsg,
    searchForMovie: searchForMovieHandler,
    getMovieFromThirdPartyApi: getMovieFromThirdPartyApiHandler,
    addMovieToDatabase: addMovieToDatabaseHandler,
    getAllMoviesFromDatabase: getMoviesFromTheDatabaseHandler,
    deleteMovieFromDatabase:deleteMovieFromTheDatabaseHandler
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContext;
