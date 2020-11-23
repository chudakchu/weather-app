import React from "react";

import classes from "./Forecast.module.css";

const forecast = (props) => (
    <div className={classes.Forecast}>
        <h3>{props.day}</h3>
        <span>{props.date}</span>
        <img className={classes.ForecastIcon} src={props.imgURL} alt="" />
        <span>{props.temperature}°</span>
    </div>
);

export default forecast;
