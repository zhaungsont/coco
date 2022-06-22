import React, {useEffect, useState} from "react";
import classes from "./Home.module.css";
import AddTask from "./AddTask";
import TaskGrid from "./TaskGrid";
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Glanceables from "./Glanceables";
import Divider from '@mui/material/Divider';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";

import IconButton from '@mui/material/IconButton';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function Home(){
    const { currentUser } = useAuth();
    console.log('in home: ')
    console.log(currentUser);
    let width = window.innerWidth > 480 ? true : false;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputTask, setInputTask] = useState('');
    const [tempTaskList, setTempTaskList] = useState([]);
    const [tempCounter, setTempCounter] = useState(1);
    const [deleteTask, setDeleteTask] = useState([]);

    function changeHandler(data){
        console.log(data.target.value);
        setInputTask(data.target.value)
    }

    function submitHandler(){
        if (inputTask.trim() !== ''){
            console.log('SUBMITTED! ' + inputTask);
            // const cat = category.title;
            // setCategory({title: ''});
            const id = tempCounter;
            setTempCounter(tempCounter + 1);
            const date = new Date();
            var seconds = date.getSeconds();
            var minutes = date.getMinutes();
            var hour = date.getHours();
            const newTask = {id: id, name: inputTask, date: date, hour: hour, minutes: minutes, seconds: seconds}
            setTempTaskList(prevList => [...prevList, newTask]);
            setInputTask('');
        }
    }

    function checkHandler(data){
        console.log('proceed to delete ' + data);
        setDeleteTask(data);
    }

    useEffect(()=>{
        const cleaner = setTimeout(() => {
            setTempTaskList(prevList => prevList.filter( prevList => !(deleteTask.includes(prevList.id)) ));
        }, 500);
        return (()=> clearTimeout(cleaner));
    }, [deleteTask])

    const now = new Date();
    const time = now.getHours();
    let greet = 'Hello,';
    if (time < 2){
        greet = 'Burning the Midnight Oil,';
    } else if (time < 5){
        greet = "Go to Bed,";
    } else if (time < 12) {
        greet = "Good Morning,"
    } else if (time < 17) {
        greet = "Good Afternoon,"
    } else {
        greet = "Good Evening,"
    }


    return(
        <>

        <div className={classes.btnWrapper}>
            <IconButton aria-label="delete" onClick={handleShow}>
                <AccountCircleRoundedIcon className={classes.userBtn} fontSize="large" />
                <div className={classes.userBtnName}>{width && currentUser.email}</div>
            </IconButton>
            <div className={classes.right}>
            <a href="https://github.com/zhaungsont/coco">
                <img className={classes.github} src={process.env.PUBLIC_URL + "/github-logo.svg"}></img>
                {width && <span>GitHub</span>}
            </a>
            </div>
        </div>
        <Sidebar show={show} handleClose={handleClose}  />
        {/* <Button variant="primary" onClick={handleShow}>
        Launch
        </Button> */}
        {/* <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <img className={classes.avatar} src={process.env.PUBLIC_URL + "/avatar.jpg"}></img>
            <div className={classes.sidebar}>
                <h1>Michael Chuang</h1>
            </div>
            </Offcanvas.Body>
        </Offcanvas> */}

        <section id="content-structure">
            <div className="frosted-glass">
                <div className={classes.headerWrapper}>
                    <div className="content-title">
                        <h1 className={classes.title}>{greet}<br></br> Michael Chuang.</h1>
                    </div>
                    <Glanceables />
                    {/* <div className={classes.glanceables}>
                            <span>Tuesday, June 21, 2022</span>
                            <span> • </span>
                            <span>27°C, Partly Cloudy</span>
                            
                    </div> */}
                </div>

                {!width && <Divider variant="middle" />}
                
                <div className={classes.responsiveWrapper}>
                    <div className={classes.mainContent}>
                    <AddTask 
                    onSubmit={submitHandler}
                    onChange={changeHandler}
                    // onCatChange={handleCatChange}
                    inputValue={inputTask}
                    // categoryValue={category}
                    />
                    <div>
                        <TaskGrid data={tempTaskList} onCheck={checkHandler} />
                        {/* {tempTaskList.map((task) => <p key={task.id}>{task.name}</p> )} */}
                    </div>
                        
                    </div>
                    <div className={classes.sideContent}>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                    
                </div>
            </div>
        </section>
        </>
    )
}