import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {filterData} from '../actions';

class Filters extends React.Component{
    
    renderInput = ({input, label}) =>{
        return(
                <div className="field">
                    <label>{label}</label>
                    <div className="ui input">
                        <input {...input} placeholder="eg Falcon" autoComplete="off" />
                    </div>
                </div>
        );
    };
    renderLaunchPads = ({input, label, launchPads=[]}) =>{
        return(
            <div className="field">
                <label>{label}</label>
                <select {...input} className="ui search dropdown">
                    <option value="0">Any</option>
                    {
                        launchPads.map(launchPad =>{
                            return <option value={launchPad.id} key={launchPad.id}>{launchPad.full_name}</option>;
                        })
                    }
                </select>
            </div>
        );
    };
    
    renderMinOptions = (years) =>{
        const {filters} = this.props;
        return years.map(year =>{
            if(filters && filters.values && filters.values.maxYear && year > filters.values.maxYear){
                return <option value={year} key={year} disabled={true}>{year}</option>
            }
            else{
                return <option value={year} key={year}>{year}</option>
            }
        });
    };
    renderMinYears = ({input, label, years=[]}) =>{
        return(
            <div className="field">
                <label>{label}</label>
                <select {...input} className="ui search dropdown">
                    <option value="0">Any</option>
                    {this.renderMinOptions(years)}
                </select>
            </div>
        );
    };
    
    renderMaxOptions = (years) =>{
        const {filters} = this.props;
        return years.map(year =>{
            if(filters && filters.values && filters.values.minYear && year < filters.values.minYear){
                return <option value={year} key={year} disabled={true}>{year}</option>
            }
            else{
                return <option value={year} key={year}>{year}</option>
            }
        });
    };
    renderMaxYears = ({input, label, years=[]}) =>{
        return(
            <div className="field">
                <label>{label}</label>
                <select {...input} className="ui search dropdown">
                    <option value="9999">Any</option>
                    {this.renderMaxOptions(years)}
                </select>
            </div>
        );
    };

    onSubmit = formValues =>{
        this.props.filterData(formValues);
    }

    render(){
        const {launchPads, years} = this.props.options;
        return(
            <div className="ui secondary segment filter-bar">
                <form className="ui grid form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="doubling four column row">
                        <div className="four wide column">
                            <Field name="search" component={this.renderInput} label="Keywords" />
                        </div>
                        <div className="four wide column">
                            <Field name="launchPad" component={this.renderLaunchPads} launchPads={launchPads} label="Launch Pad" />
                        </div>
                        <div className="three wide column">
                            <Field name="minYear" component={this.renderMinYears} years={years} label="Min Year" />
                        </div>
                        <div className="three wide column">
                            <Field name="maxYear" component={this.renderMaxYears} years={years} label="Max Year" />
                        </div>
                        <div className="two wide column">							
                            <div className="field">
                                <button className="ui teal button action">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}

const mapStateToProps = state =>{
    return {
        options: {years: state.years, launchPads: state.launchPads},
        filters: state.form.filters
    };
};

export default connect(mapStateToProps, {filterData})(reduxForm({
    form: 'filters'
})(Filters));