import React from "react";

import Search from "./Search/Search.jsx";
import Info from "./Info/Info.jsx";
import ForecastList from "./ForecastList/ForecastList.jsx";

const Weather = (props) => (
    <main>
        <Search getData={props.getData} setCity={props.setCity} />
        {props.weather !== null && props.cityForecast.length !== 0 ? (
            <>
                <Info
                    weather={props.weather}
                    isCitySaved={props.isCitySaved}
                    addCity={props.addCityId}
                />
                <ForecastList cityForecast={props.cityForecast} />
            </>
        ) : null}
    </main>
);

export default Weather;
