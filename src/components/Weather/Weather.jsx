import React from "react";
import { connect } from "react-redux";

import Search from "./Search/Search.jsx";
import Info from "./Info/Info.jsx";
import ForecastList from "./ForecastList/ForecastList.jsx";

const Weather = (props) => (
    <main>
        <Search />
        {props.cityWeather !== null && props.cityForecast.length !== 0 ? (
            <>
                <Info />
                <ForecastList />
            </>
        ) : null}
    </main>
);

const mapStateToProps = (state) => {
    return {
        cityWeather: state.cityWeather,
        cityForecast: state.cityForecast,
    };
};

export default connect(mapStateToProps)(Weather);
