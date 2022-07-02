import React from 'react';
import classes from "./Cat.module.css";

export default function Cat() {
    return (
        <div className={classes.lemoncat}>
            <img src={`${process.env.PUBLIC_URL}/cat/1.jpg`}></img>
            <img src={`${process.env.PUBLIC_URL}/cat/2.jpg`}></img>
            <img src={`${process.env.PUBLIC_URL}/cat/3.jpg`}></img>
            <img src={`${process.env.PUBLIC_URL}/cat/4.jpg`}></img>
            <img src={`${process.env.PUBLIC_URL}/cat/6.jpg`}></img>
            <img src={`${process.env.PUBLIC_URL}/cat/7.jpg`}></img>
            <img src={`${process.env.PUBLIC_URL}/cat/8.jpg`}></img>
            <img src={`${process.env.PUBLIC_URL}/cat/5.jpg`}></img>
            <p>My precious baby cat ❤️</p>
        </div>
    )
}
