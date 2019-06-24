import _ from 'lodash';

export const filterFlightNumber = (search, launch) =>{
    if(search){
        return _.last(search.toLowerCase().split('#')) === launch.id.toString();
    }
    else{
        return true;
    }
};
export const filterRocketName = (search, launch) =>{
    if(search){
        return(
            _.includes(launch.rocketName.toLowerCase().split(' '), search) || 
            launch.rocketName.toLowerCase() === search
        );
    }
    else{
        return true;
    }
};
export const filterPayloadId = (search, launch) =>{
    if(search){
        return _.includes(launch.payloadId.toLowerCase(), search);
    }
    else{
        return true;
    }
};
export const filterLaunchPad = (launchPadDropdown, launch) =>{
    if(launchPadDropdown && parseFloat(launchPadDropdown) !== 0){
        return _.includes(launch.site.id, launchPadDropdown);
    }
    else{
        return true;
    }
};
export const filterYears = (minYear, maxYear, launch) =>{
    if((minYear || maxYear) && (parseFloat(minYear) > 0 || parseFloat(maxYear) < 9999)){
        maxYear = !maxYear ? Number.MAX_SAFE_INTEGER : parseFloat(maxYear) + 1;
        minYear = !minYear ? 0 : minYear;
        return _.inRange(launch.date.year, minYear, maxYear);
    }
    else{
        return true;
    }
};