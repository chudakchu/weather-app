import * as actionTypes from "./actionTypes";

export const setIsSearch = (isSearch) => {
    return {
        type: actionTypes.SET_IS_SEARCH,
        isSearch: isSearch,
    };
};

export const setCityName = (cityName) => {
    return {
        type: actionTypes.SET_CITY_NAME,
        cityName: cityName,
    };
};

export const setCityWeather = (cityWeather) => {
    return {
        type: actionTypes.SET_CITY_WEATHER,
        cityWeather: cityWeather,
    };
};

export const setIsCitySaved = (isCitySaved) => {
    return {
        type: actionTypes.SET_IS_CITY_SAVED,
        isCitySaved: isCitySaved,
    };
};

export const setCityForecast = (cityForecast) => {
    return {
        type: actionTypes.SET_CITY_FORECAST,
        cityForecast: cityForecast,
    };
};

export const setSavedCities = (savedCities) => {
    return {
        type: actionTypes.SET_SAVED_CITIES,
        savedCities: savedCities,
    };
};

export const setSavedCitiesIds = (savedCitiesIds) => {
    return {
        type: actionTypes.SET_SAVED_CITIES_IDS,
        savedCitiesIds: savedCitiesIds,
    };
};

export const getCitiesIdsFromLocalStorage = () => {
    return (dispatch) => {
        if (localStorage.getItem("citiesIds") === null) return;
        const citiesIdsString = localStorage.getItem("citiesIds");
        const citiesIdsArr = JSON.parse(citiesIdsString);
        dispatch(setSavedCitiesIds(citiesIdsArr));
    };
};

export const addCityIdToLocalStorage = (id, savedCitiesIds) => {
    return (dispatch) => {
        const ids = [...savedCitiesIds];
        if (ids.includes(id)) {
            dispatch(setIsCitySaved(false));
            dispatch(removeCityIdFromLocalStorage(id, savedCitiesIds));
            return;
        }
        ids.push(id);
        dispatch(setSavedCitiesIds(ids));
        dispatch(setIsCitySaved(true));
        localStorage.setItem("citiesIds", JSON.stringify(ids));
    };
};

export const removeCityIdFromLocalStorage = (id, savedCitiesIds) => {
    return (dispatch) => {
        const ids = [...savedCitiesIds];
        if (!ids.includes(id)) return;
        const index = ids.indexOf(id);
        ids.splice(index, 1);
        dispatch(setSavedCitiesIds(ids));
        localStorage.setItem("citiesIds", JSON.stringify(ids));
        dispatch(setIsCitySaved(false));
    };
};

export const getSavedCities = (savedCitiesIds) => {
    return (dispatch) => {
        if (savedCitiesIds.length === 0) {
            dispatch(setSavedCities([]));
            return;
        }
        const url = `http://api.openweathermap.org/data/2.5/group?id=${savedCitiesIds.join(
            ","
        )}&appid=ffd5b222893afee068a6566732e068d5&units=metric`;
        fetch(url)
            .then((response) => {
                if (response.ok)
                    response
                        .json()
                        .then((data) => dispatch(setSavedCities(data.list)));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getCurrentWeather = (cityName, savedCitiesIds) => {
    return (dispatch) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ffd5b222893afee068a6566732e068d5&units=metric`;
        fetch(url)
            .then((response) => {
                if (response.ok)
                    response.json().then((data) => {
                        dispatch(setCityWeather(data));
                        dispatch(
                            getCityForecast(data.coord.lat, data.coord.lon)
                        );
                        dispatch(setIsCitySaved(false));
                        if (savedCitiesIds.includes(data.id))
                            dispatch(setIsCitySaved(true));
                    });
                else if (response.status === 404) throw new Error("Wrong city");
                else throw new Error("Some other error " + response.status);
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getCityForecast = (lat, lon) => {
    return (dispatch) => {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=ffd5b222893afee068a6566732e068d5&units=metric`;

        fetch(url).then((response) => {
            response.json().then((data) => {
                dispatch(setCityForecast(data.daily.splice(1, 6)));
            });
        });
    };
};

export const savedCityClicked = (cityName, savedCitiesIds) => {
    return (dispatch) => {
        dispatch(getCurrentWeather(cityName, savedCitiesIds));
        dispatch(setCityName(cityName));
        dispatch(setIsSearch(true));
    };
};
