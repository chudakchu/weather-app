import * as actionTypes from "./actionTypes";

const initialState = {
    cityName: "",
    cityWeather: null,
    isCitySaved: false,
    cityForecast: [],
    savedCities: [],
    savedCitiesIds: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CITY_NAME:
            return {
                ...state,
                cityName: action.cityName,
            };
        case actionTypes.SET_CITY_WEATHER:
            return {
                ...state,
                cityWeather: action.cityWeather,
            };
        case actionTypes.SET_IS_CITY_SAVED:
            return {
                ...state,
                isCitySaved: action.isCitySaved,
            };
        case actionTypes.SET_CITY_FORECAST:
            return {
                ...state,
                cityForecast: action.cityForecast,
            };
        case actionTypes.SET_SAVED_CITIES:
            return {
                ...state,
                savedCities: action.savedCities,
            };
        case actionTypes.SET_SAVED_CITIES_IDS:
            return {
                ...state,
                savedCitiesIds: action.savedCitiesIds,
            };
        default:
            return state;
    }
};

export default reducer;
