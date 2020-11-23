import React from "react";

import classes from "./Info.module.css";
import { ReactComponent as Bookmark } from "../../../assets/bookmark.svg";

const info = (props) => (
    <div className={classes.Info}>
        <div className={classes.InfoBlock}>
            <Bookmark
                className={
                    props.isCitySaved
                        ? classes.BookmarkSaved
                        : classes.BookmarkUnsaved
                }
                onClick={() => props.addCity(props.weather.id)}
            />
            <div className={classes.Text}>
                <h2>
                    {props.weather.name}, {props.weather.sys.country}
                </h2>
                <h4>{new Date(props.weather.dt * 1000).toDateString()}</h4>
            </div>
        </div>

        <div className={classes.Details}>
            <div className={classes.ImageInfo}>
                <div>
                    <img
                        src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
                        alt="weather"
                    />
                </div>
                <div>
                    <h3>{Math.round(props.weather.main.temp)}°</h3>
                    <h4>
                        {props.weather.weather[0].description
                            .charAt(0)
                            .toUpperCase() +
                            props.weather.weather[0].description.slice(1)}
                    </h4>
                </div>
            </div>
            <div className={classes.Description}>
                <div className={classes.Row}>
                    <div className={classes.DescriptionItem}>
                        <h4>{Math.round(props.weather.main.temp_max)}°</h4>
                        <span>Hight</span>
                    </div>
                    <div className={classes.DescriptionItem}>
                        <h4>{Math.round(props.weather.wind.speed * 3)} kph</h4>
                        <span>Wind</span>
                    </div>
                    <div className={classes.DescriptionItem}>
                        <h4>
                            {new Date(
                                props.weather.sys.sunrise * 1000
                            ).toLocaleTimeString()}
                        </h4>
                        <span>Sunrise</span>
                    </div>
                </div>
                <div className={classes.Row}>
                    <div className={classes.DescriptionItem}>
                        <h4>{Math.round(props.weather.main.temp_min)}°</h4>
                        <span>Low</span>
                    </div>
                    <div className={classes.DescriptionItem}>
                        <h4>{props.weather.main.humidity}%</h4>
                        <span>Humidity</span>
                    </div>
                    <div className={classes.DescriptionItem}>
                        <h4>
                            {new Date(
                                props.weather.sys.sunset * 1000
                            ).toLocaleTimeString()}
                        </h4>
                        <span>Sunset</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default info;
