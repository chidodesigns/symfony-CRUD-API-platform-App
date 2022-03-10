import React, {useRef, useContext, useEffect} from "react";
import { useHistory,Link, NavLink } from "react-router-dom";
import classes from "./Header.module.css";

import AppContext from "../../store/app-context";

function Header() {
 const history = useHistory()
  //    Form Input Ref 
  const searchInputRef = useRef();

  const appInfoContext = useContext(AppContext)

  const {movieListings, errorMessage, searchFieldFailure, searchFieldSuccess} = appInfoContext

  useEffect(() => {

    if(searchFieldSuccess){
        history.replace('/search/'+searchInputRef.current.value)
    }

  }, [searchFieldSuccess, movieListings])

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredSearchText = searchInputRef.current.value
    appInfoContext.searchForMovie(enteredSearchText)
  }

  if(errorMessage || searchFieldFailure){
      return (
          <h1>{errorMessage}</h1>
      )
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MOD
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Movie Listings
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={submitHandler}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Find Public Movies"
                aria-label="Search"
                ref={searchInputRef}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
