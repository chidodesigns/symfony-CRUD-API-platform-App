import React from 'react'
import {Route, Switch} from 'react-router-dom';
//  Pages
import Homepage from './src/pages/Homepage'
// Navigation 



function app() {
  return (
    <div>
        <Switch>
            <Route path='/' exact>
                <Homepage/>
            </Route>
        </Switch>
    </div>
  )
}

export default app