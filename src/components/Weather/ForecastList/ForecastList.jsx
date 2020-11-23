import React from "react";
import { connect } from "react-redux";

import Forecast from "./Forecast/Forecast.jsx";
import classes from "./ForecastList.module.css";

const ForecastList = (props) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <section className={classes.ForecastSection}>
            <h3>Forecast: </h3>
            <div className={classes.ForecastList}>
                {props.cityForecast.map((forecast) => (
                    <Forecast
                        key={forecast.dt}
                        day={days[new Date(forecast.dt * 1000).getDay()]}
                        date={`
                        ${new Date(forecast.dt * 1000).getDate()} / 
                        ${new Date(forecast.dt * 1000).getMonth()}
                        `}
                        imgURL={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        temperature={Math.round(forecast.temp.day)}
                    />
                ))}
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        cityForecast: state.cityForecast,
    };
};

export default connect(mapStateToProps)(ForecastList);
