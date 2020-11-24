import React from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import classes from "./Navigation.module.css";

const navigation = (props) => (
    <ul className={classes.Navigation}>
        <li
            className={props.isSearch ? classes.Active : classes.NavigationItem}
            onClick={() => props.setIsSearch(true)}
        >
            Search
        </li>
        <li
            className={
                !props.isSearch ? classes.Active : classes.NavigationItem
            }
            onClick={() => props.setIsSearch(false)}
        >
            Cities
        </li>
    </ul>
);

const mapStateToProps = (state) => {
    return {
        isSearch: state.isSearch,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsSearch: (isSearch) => dispatch(actions.setIsSearch(isSearch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(navigation);
