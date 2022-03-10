import React,{ createContext, useState } from "react";

const AppContext = createContext({
    movieListings: [],
    searchFieldSuccess: null,
    searchFieldFailure: null,
    AppStateMessage: '',
    errorMessage: '',
    searchForMovieHandler: (searchTerm) => {}
})

export function AppContextProvider(props)
{
    const [movieList, setMovieList] = useState([])
    const [searchFailed, setSearchFailed] = useState()
    const [searchSuccess, setSearchSuccess] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [appMsg, setAppMsg] = useState()


    function searchForMovieHandler(searchTerm)
    {
        //  Reset State
        setMovieList([])
        setSearchSuccess(null)
        setAppMsg(null)

        fetch(`https://imdb-api.com/en/API/SearchMovie/${process.env.IMDB_API_KEY}/${searchTerm}`,{
            method: 'GET',
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then((response) => {
           
            if(response.ok){
                response.json().then((data) => {
                    // console.log(data)
                    if(data.results.length > 0){
                        setMovieList(data.results)
                    }else{
                        setAppMsg('No movie title results with your search term:' + data.expression)
                    }
                    setSearchSuccess(true)
                    return
                })
            }else{
                return Promise.reject(response);
            }
        })
        .catch((error) => {
            error.json().then((data) => {
                setSearchFailed(true)
                setErrorMsg(data.errorMessage)
            });
          });
    }
    
    const context = {
        movieListings: movieList,
        searchFieldSuccess: searchSuccess,
        searchFieldFailure: searchFailed,
        errorMessage: errorMsg,
        AppStateMessage: appMsg,
        searchForMovie: searchForMovieHandler
    }

    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContext;