import React from 'react';
import {connect} from 'react-redux';
import {
    Title,
    LaunchDetails,
    Links,
    Placeholder
} from './LaunchesElements';

class Launches extends React.Component{

    renderPlaceholder(){
        return(
            <div>
                <Placeholder /><Placeholder /><Placeholder /><Placeholder /><Placeholder />
            </div>
        )
    };    
    renderLaunches(){
        return(
            this.props.launches.items.map(launch =>{
                const {
                    id,
                    title,
                    success,
                    date,
                    site,
                    links
                } = launch;
                return(
                    <div className="item" key={id}>
                        <div className="ui tiny image">
                            <img alt={title} src={links.mission_patch} />
                        </div>
                        <div className="middle aligned content descr">
                            <Title title={title} success={success} />
                            <LaunchDetails date={date} site={site} />
                            <Links links={links} />                            
                        </div>
                        <div className="ui segment flight-no-wrapper">
                            <div className="flight-no">
                                <span className="ui large header">#{id}</span>
                                <div className="meta">
                                    <p>Flight Number</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        ); 
    };

    renderMessage(){
        const {errors, launches} = this.props;
        if(errors.status){
            return <span>{errors.message}</span>;
        }
        else if(launches.isFetching){
            return <span>Loading...</span>
        }
        else{
            return <span>Showing {launches.items.length} Missions</span>;
        }
    };

    renderContent(){
        const {errors, launches} = this.props;
        if(launches.isFetching || errors.status){
            return this.renderPlaceholder();
        }
        else{
            return this.renderLaunches();
        }
    }
    
    render(){
        return (
            <div className="results-list">				
                <div className="ui segment">
                    <div className="results-prompt">
                        <div className="ui center aligned tiny header">
                            {this.renderMessage()}
                        </div>
                    </div>
                    <div className="ui divided items">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        launches: state.launches,
        launchPads: state.launchPads,
        errors: state.errors
    };
};

export default connect(mapStateToProps)(Launches);