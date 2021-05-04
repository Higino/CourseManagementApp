import React, { Component } from 'react';
import ParseCSVFileDashboard from './components/ParseCSVFileDashboard';

class Home extends Component {
    state = { mydata: {} }

    render() { 
        return (
            <ParseCSVFileDashboard />
              
            );
    }
}
 
export default Home;