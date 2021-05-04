import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNav from './AppNav';
import CourseListing from './components/CourseListing'
import Home from './Home';
import ImportData from './components/ImportData';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <AppNav/>
            <Router>
                <Switch>
                     <Route path='/' exact={true} component={Home}/>
                     <Route path='/courselisting' exact={true} component={CourseListing}/>                     
                     <Route path='/import' exact={true} component={ImportData}/>
                </Switch>
             </Router>
             </>
        );
    }
}
 
export default App;
