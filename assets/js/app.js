import React from 'react'
import {Route, Switch} from 'react-router-dom';
//  Pages
import Homepage from './src/pages/Homepage'
import MovieSearchResultsPage from './src/pages/MovieSearchResultsPage';
// Navigation 
import Header from './src/components/layout/Header';
import Footer from './src/components/layout/Footer';



function app() {
  return (
    <div>
        <Header/>
        <div className='container main-wrapper-container'>
        <Switch>
            <Route path='/' exact>
                <MovieSearchResultsPage/>
            </Route>
        </Switch>
        </div>
        <Footer/>
    </div>
  )
}

export default app