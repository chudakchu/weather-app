import React from "react";
import { connect } from "react-redux";

import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";

import * as actions from "../../../store/actions";

import classes from "./Search.module.css";

const search = (props) => (
    <form
        onSubmit={(e) => {
            e.preventDefault();
            props.getCurrentWeather(props.cityName, props.savedCitiesIds);
        }}
        className={classes.Search}
    >
        <Input
            placeholder="Type in your city"
            changed={(e) => props.setCityName(e.target.value)}
        />
        <Button type="submit">Search</Button>
    </form>
);

const mapStateToProps = (state) => {
    return {
        cityName: state.cityName,
        savedCitiesIds: state.savedCitiesIds,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCityName: (cityName) => dispatch(actions.setCityName(cityName)),
        getCurrentWeather: (cityName, savedCitiesIds) =>
            dispatch(actions.getCurrentWeather(cityName, savedCitiesIds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(search);
