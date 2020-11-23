import React from "react";

import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import classes from "./WeatherCardList.module.css";

const WeatherCardList = (props) => {
    return (
        <div className={classes.CardList}>
            {props.cities.map((city) => (
                <WeatherCard
                    key={city.id}
                    cityName={city.name}
                    temperature={Math.round(city.main.temp)}
                    description={city.weather[0].main}
                    imgURL={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                    removeCityId={() => props.removeCityId(city.id)}
                />
            ))}
        </div>
    );
};

export default WeatherCardList;
