import React from "react";

import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";

import classes from "./Search.module.css";

const search = (props) => (
    <form onSubmit={props.getData} className={classes.Search}>
        <Input
            placeholder="Type in your city"
            changed={(e) => props.setCity(e.target.value)}
        />
        <Button type="submit">Search</Button>
    </form>
);

export default search;
