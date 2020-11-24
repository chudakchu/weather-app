import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "./store/actions";

import Navigation from "./components/Navigation/Navigation.jsx";
import Weather from "./components/Weather/Weather.jsx";
import WeatherCardList from "./components/WeatherCardList/WeatherCardList.jsx";
import Footer from "./components/Footer/Footer.jsx";

import "./App.css";

const App = (props) => {
    const { getCitiesIdsFromLocalStorage, getSavedCities } = props;

    useEffect(() => {
        getCitiesIdsFromLocalStorage();
    }, [getCitiesIdsFromLocalStorage]);

    useEffect(() => {
        getSavedCities(props.savedCitiesIds);
    }, [getSavedCities, props.savedCitiesIds]);

    return (
        <div className="container">
            <Navigation />
            {props.isSearch ? <Weather /> : <WeatherCardList />}
            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isSearch: state.isSearch,
        savedCitiesIds: state.savedCitiesIds,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCitiesIdsFromLocalStorage: () =>
            dispatch(actions.getCitiesIdsFromLocalStorage()),
        getSavedCities: (savedCitiesIds) =>
            dispatch(actions.getSavedCities(savedCitiesIds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
