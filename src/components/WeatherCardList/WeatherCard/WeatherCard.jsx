import React from "react";

import classes from "./WeatherCard.module.css";
import { ReactComponent as Delete } from "../../../assets/delete.svg";

const weatherCard = (props) => (
    <div className={classes.Card}>
        <Delete className={classes.Delete} onClick={props.removeCityId} />
        <h3 className={classes.CityName}>{props.cityName}</h3>
        <span className={classes.CityTemp}>{props.temperature}°</span>
        <figure>
            <img classes={classes.CityIcon} src={props.imgURL} alt="" />
            <figcaption>{props.description}</figcaption>
        </figure>
    </div>
);

export default weatherCard;
