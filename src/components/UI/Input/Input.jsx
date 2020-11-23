import React from "react";
import classes from "./Input.module.css";

const input = (props) => (
    <input
        autoFocus={true}
        className={classes.Input}
        value={props.value}
        onChange={props.changed}
        placeholder={props.placeholder}
    />
);

export default input;
