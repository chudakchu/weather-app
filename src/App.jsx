import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "./store/actions";

import Navigation from "./components/Navigation/Navigation.jsx";
import Weather from "./components/Weather/Weather.jsx";
import WeatherCardList from "./components/WeatherCardList/WeatherCardList.jsx";
import Footer from "./components/Footer/Footer.jsx";

import "./App.css";

const App = (props) => {
    const [isSearch, setIsSearch] = useState(true);

    const searchClicked = () => setIsSearch(true);
    const savedClicked = () => setIsSearch(false);

    const { getCitiesIdsFromLocalStorage, getSavedCities } = props;

    useEffect(() => {
        getCitiesIdsFromLocalStorage();
    }, [getCitiesIdsFromLocalStorage]);

    useEffect(() => {
        getSavedCities(props.savedCitiesIds);
    }, [getSavedCities, props.savedCitiesIds]);

    return (
        <>
            <div className="container">
                <Navigation
                    search={searchClicked}
                    saved={savedClicked}
                    isSearch={isSearch}
                />
                {isSearch ? <Weather /> : <WeatherCardList />}
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
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
