import React from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import WeatherCard from "./WeatherCard/WeatherCard.jsx";

import classes from "./WeatherCardList.module.css";

const WeatherCardList = (props) => (
    <div className={classes.CardList}>
        {props.savedCities.map((city) => (
            <WeatherCard
                key={city.id}
                cityName={city.name}
                temperature={Math.round(city.main.temp)}
                description={city.weather[0].main}
                imgURL={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                savedCityClicked={() =>
                    props.savedCityClicked(city.name, props.savedCitiesIds)
                }
                removeCityId={() =>
                    props.removeCityIdFromLocalStorage(
                        city.id,
                        props.savedCitiesIds
                    )
                }
            />
        ))}
    </div>
);

const mapStateToProps = (state) => {
    return {
        savedCities: state.savedCities,
        savedCitiesIds: state.savedCitiesIds,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        savedCityClicked: (cityName, savedCitiesIds) =>
            dispatch(actions.savedCityClicked(cityName, savedCitiesIds)),
        removeCityIdFromLocalStorage: (id, savedCitiesIds) =>
            dispatch(actions.removeCityIdFromLocalStorage(id, savedCitiesIds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCardList);
