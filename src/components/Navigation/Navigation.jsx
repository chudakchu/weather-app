import React from "react";

import classes from "./Navigation.module.css";

const navigation = (props) => {
    return (
        <ul className={classes.Navigation}>
            <li
                className={
                    props.isSearch ? classes.Active : classes.NavigationItem
                }
                onClick={props.search}
            >
                Search
            </li>
            <li
                className={
                    !props.isSearch ? classes.Active : classes.NavigationItem
                }
                onClick={props.saved}
            >
                Cities
            </li>
        </ul>
    );
};

export default navigation;
