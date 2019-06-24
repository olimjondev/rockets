import React, {Component} from 'react';
import Launches from './Launches/Launches';
import Filters from './Filters';
import { connect } from 'react-redux';
import {execute} from '../actions';

class App extends Component{

    componentDidMount(){
        this.props.execute();
    }

    render(){
        return(
            <div className="main ui container">
                <Filters />
                <Launches />
            </div>
        );
    };
};

export default connect(null, {execute})(App);