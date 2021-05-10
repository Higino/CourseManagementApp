import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNav from './AppNav';
import CourseListing from './components/CourseListing'
import Home from './Home';
import CourseManagement from './components/CourseManagement';
import ParseCSVFileDashboard from './components/ParseCSVFileDashboard'

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <AppNav/>
            <Router>
                <Switch>
                     <Route path='/' exact={true} component={Home}/>
                     <Route path='/courselisting/:id' exact={true} component={CourseListing}/>
                     <Route path='/courselisting' exact={true} component={CourseListing}/>                     
                     <Route path='/courses' exact={true} component={CourseManagement}/>                     
                     <Route path='/import' exact={true} component={ParseCSVFileDashboard}/>
                </Switch>
             </Router>
             </>
        );
    }
}
 
export default App;
