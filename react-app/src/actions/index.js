import flights from '../api/flights';
import _ from 'lodash';
import moment from 'moment-timezone';
import {
    FETCH_LAUNCH_PADS,
    GET_YEARS,
    FETCH_ALL_LAUNCHES,
    CONNECTION_ERROR,
    CONNECTION_SUCCESS,
    FILTER_DATA_RECIEVE,
    FILTER_DATA_REQUEST,
    LAUNCHES_RECIEVE,
    LAUNCHES_REQUEST
} from '../types';
import {
    filterFlightNumber,
    filterLaunchPad,
    filterPayloadId,
    filterRocketName,
    filterYears
} from './filters';

const getLaunch = (launch, launchPads) =>{
    const site = _.find(launchPads, (lp) => lp.id === launch.launch_site.site_id);
    const rawDate = moment(launch.launch_date_local).tz('Australia/Sydney');
    const payloads = launch.payloads.map(p=>p.payload_id).join(', ');
    const date = {
        day: rawDate.format('DD'),
        month: rawDate.format('MMM'),
        year: rawDate.format('YYYY'),
        time: rawDate.format('ha'),
        rawDate: rawDate
    }
    return {
        id: launch.flight_number,
        title: `${launch.rocket.rocket_name} - ${payloads}`,
        rocketName: launch.rocket.rocket_name,
        payloadId: payloads,
        success: launch.launch_success,
        date: date,
        site: site ? site : null,
        links: launch.links
    }
};

export const fetchLaunchPads = () => async (dispatch) =>{
    await flights.get('/launchpads')
    .then((response) =>{
        dispatch({type: CONNECTION_SUCCESS});
        dispatch({type: FETCH_LAUNCH_PADS, payload: response.data});
    })
    .catch(() => {
        dispatch({type: CONNECTION_ERROR});
    });
};

export const fetchLaunches = () => async (dispatch, getState) =>{
    dispatch({type: LAUNCHES_REQUEST});
    
    return await flights.get('/launches')
    .then((response) =>{
        dispatch({type: CONNECTION_SUCCESS});
        const launches = [];
        response.data.forEach(launch =>{
            launches.push(getLaunch(launch, getState().launchPads));
        });
        dispatch({type: LAUNCHES_RECIEVE, payload: launches});
        dispatch({type: FETCH_ALL_LAUNCHES, payload: launches});
    })
    .catch(() =>{
        dispatch({type: CONNECTION_ERROR});
    });
};

export const getYears = () => async (dispatch, getState) =>{
    const years = await _.chain(getState().allLaunches.items)
                    .map((launch) => launch.date.year)
                    .uniq()
                    .value();
    dispatch({type: GET_YEARS, payload: years});
};

export const filterData = ({search, minYear, maxYear, launchPad}) => async (dispatch, getState) =>{
    dispatch({type: FILTER_DATA_REQUEST});
    await dispatch(execute());
    let results;
    if((parseFloat(search) !== 0)){
        if(search || minYear || maxYear || launchPad){
            results = await getState().launches.items.filter((launch) => {
                return (
                   (filterFlightNumber(search, launch) || 
                   filterRocketName(search, launch) || 
                   filterPayloadId(search, launch)) &&
                   (filterLaunchPad(launchPad, launch)) && 
                   (filterYears(minYear, maxYear, launch))
               );
           });
        }
        else{
            results = getState().launches.items;
        }        
        dispatch({type: FILTER_DATA_RECIEVE, payload: results});
    }
};

export const execute = () => async (dispatch) => {
    await dispatch(fetchLaunchPads());
    await dispatch(fetchLaunches());
    await dispatch(getYears());
};