import React, {useEffect, useState} from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import classes from "./Sidebar.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
    const { currentUser } = useAuth();

  return (
    <>
        {/* <Button variant="primary" onClick={handleShow}>
        Launch
        </Button> */}
        <Offcanvas show={props.show} onHide={props.handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <img className={classes.avatar} src={process.env.PUBLIC_URL + "/avatar.jpg"}></img>
            <div className={classes.sidebar}>
                <h1 className={classes.username}>Michael Chuang</h1>
                <p><span>Email: </span>{currentUser.email}</p>
            </div>
            
            <div className={classes.bottom}>
                <Link to="/updateuser">Edit account info</Link>
            </div>
            </Offcanvas.Body>
        </Offcanvas>
    </>
  )
}
