import React from 'react'
import {Route, Switch} from 'react-router-dom';
//  Pages
import Homepage from './src/pages/Homepage'
// Navigation 
import Header from './src/components/layout/Header';



function app() {
  return (
    <div>
        <Header/>
        <div className='container'>
        <Switch>
            <Route path='/' exact>
                <Homepage/>
            </Route>
        </Switch>
        </div>
    </div>
  )
}

export default app