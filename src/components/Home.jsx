import React, {useEffect, useRef, useState} from "react";
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


import quotes from "../dummy-data/quotes";

// Firebase
import Firebase, {auth, database} from "../Firebase";
import { ref, set, push, onValue, update } from "firebase/database";


// Tabs
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
///////
import SecondaryTaskGrid from "./SecondaryTaskGrid";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pt: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

export default function Home(){
    // Tabs
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //////

    const { currentUser } = useAuth();
    console.log("current user: " + currentUser.email);
    let width = window.innerWidth > 480 ? true : false;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const [inputTask, setInputTask] = useState('');
    const inputTask = useRef('');
    const inputTag = useRef('');

    const [taskList, setTaskList] = useState([]);
    const [tempCounter, setTempCounter] = useState(1);
    const [deleteTask, setDeleteTask] = useState([]);
    const [addBackTask, setAddBackTask] = useState([])

    const [quoteIndex, setQuoteIndex] = useState(0);

    // Add new Task
    function submitHandler(){
        if (inputTask.current.value.trim() !== ''){
            const taskName = inputTask.current.value.trim();
            const taskTag = inputTag.current.value;
            console.log('SUBMITTED! ' + taskName);
            // const id = tempCounter;
            // setTempCounter(tempCounter + 1);
            const date = new Date();
            const milliseconds = date.getTime()
            const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            const weekday = weekdays[date.getDay() - 1];
            const day = date.getDate()

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = months[date.getMonth()];

            const year = date.getFullYear();
            const seconds = date.getSeconds();
            const minutes = date.getMinutes();
            const hour = date.getHours();
            const newTask = {name: taskName, year: year, month: month, day: day, weekday: weekday, hour: hour, minutes: minutes, seconds: seconds, milliseconds: milliseconds, tag: taskTag, done: false}
            
            // push new task to firebase (old way)
            // set(ref(database, `tasks/${currentUser.uid}/${newTask.id}`), newTask);
            
            // new way
            const taskListRef = ref(database, `tasks/${currentUser.uid}`);
            const newTaskRef = push(taskListRef);
            set(newTaskRef, newTask);
                        
            // praise the stackoverflow post that points me to this page: 
            // https://firebase.google.com/docs/database/web/lists-of-data

            // clear input field. (I know we should generally avoid controlling forms with ref but here it works!)
            inputTask.current.value = '';
            inputTag.current.value = '';
        }
    }

    // Get Task List from Firebase
    useEffect(()=>{
        console.log('proceed to get task list')
        const taskListRef = ref(database, `tasks/${currentUser.uid}`);
        onValue(taskListRef, (snapshot) => {
            setTaskList([]);
            const data = snapshot.val();
            if (data !== null){
                // console.log("Found user task list.");

                Object.entries(data).map(task => {
                    // each entry is an array of two elements: a string (task id) and an object containing actual task info
                    // console.log('entry name:' + task[0]);
                    // console.log('entry content: ' + task[1]);

                    const id = task[0]
                    setTaskList(oldTaskList => [...oldTaskList, {...task[1] ,id: id}])
                })
            } else {
                console.log('no data for this user.')
            }
            // setTaskList(postElement, data);
          });

    }, [])

    function checkHandler(data){
        console.log('proceed to delete ' + data);
        setDeleteTask(data);
    }

    // Mark task as done 
    useEffect(()=>{
        const cleaner = setTimeout(() => {
            deleteTask.map(task => {
                update(ref(database, `tasks/${currentUser.uid}/${task}`), {
                    done: true
                })
            })
            // setTaskList(prevList => prevList.filter( prevList => !(deleteTask.includes(prevList.id)) ));
        }, 500);
        return (()=> clearTimeout(cleaner));
    }, [deleteTask])

    function addbackHandler(data){
        console.log('proceed to add ' + data + " back.");
        setAddBackTask(data);
    }

    // Add back task (Mark as undone)
    useEffect(()=>{
        const cleaner = setTimeout(() => {
            addBackTask.map(task => {
                update(ref(database, `tasks/${currentUser.uid}/${task}`), {
                    done: false
                })
            })
        }, 500);
        return (()=> clearTimeout(cleaner));
    }, [addBackTask])

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
    // console.log(randomIndex);

    useEffect(()=>{
        setQuoteIndex(Math.floor(Math.random() * quotes.length));

    }, [])
    return(
        <>
            <IconButton aria-label="delete" onClick={handleShow}>
                <AccountCircleRoundedIcon className={classes.userBtn} fontSize="large" />
            </IconButton>

        <Sidebar show={show} handleClose={handleClose}  />

        <section id="content-structure">
            <div className="frosted-glass">
                <div className={classes.headerWrapper}>
                    <div className="content-title">
                        <h1 className={classes.title}>{greet}<br></br> Michael Chuang.</h1>
                    </div>
                    <Glanceables />

                </div>
                
                <div className={classes.quotes}>
                    <span>{quotes[quoteIndex].quote}</span><span> — {quotes[quoteIndex].from}</span>
                </div>

                {!width && <Divider variant="middle" />}
                
                <div className={classes.responsiveWrapper}>
                    <div className={classes.mainContent}>
                    <AddTask 
                    onSubmit={submitHandler}
                    // onChange={changeHandler}
                    // onCatChange={handleCatChange}
                    inputValue={inputTask}
                    tagValue={inputTag}
                    // categoryValue={category}
                    />
                    <div className={classes.mainList}>
                        <TaskGrid data={taskList} onCheck={checkHandler} />
                        {/* {taskList.map((task) => <p key={task.id}>{task.name}</p> )} */}
                    </div>

                    <div className={classes.tabs}>
                        <Box sx={{ margin: "1rem" }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="view options" variant="scrollable" >
                                <Tab label="Overview" {...a11yProps(0)} />
                                <Tab label="Today" {...a11yProps(1)} />
                                <Tab label="7 days" {...a11yProps(2)} />
                                <Tab label="This Month" {...a11yProps(3)} />
                                <Tab label="History" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <div className={classes.tabDesc}>
                                <h3>Overview</h3>
                                <p><strong>Tip: </strong>Give me money.</p>
                            </div>
                        </TabPanel>
                        
                        <TabPanel value={value} index={1}>
                            <div className={classes.tabDesc}>
                                <h3>Today</h3>
                                <p><strong>Tip: </strong>Click on any of the finished tasks to mark them as undone.</p>
                            </div>
                            <SecondaryTaskGrid data={taskList} method="done today" onAddBack={addbackHandler} dependency={[deleteTask, addBackTask]} sx={{padding: 0}} />
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                            <div className={classes.tabDesc}>
                                <h3>All finished tasks in the past 7 days.</h3>
                                <p><strong>Tip: </strong>Click on any of the finished tasks to mark them as undone.</p>
                            </div>
                            <SecondaryTaskGrid data={taskList} method="week" onAddBack={addbackHandler} dependency={[deleteTask, addBackTask]} />
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            <div className={classes.tabDesc}>
                                <h3>All finished tasks from this month.</h3>
                                <p><strong>Tip: </strong>Click on any of the finished tasks to mark them as undone.</p>
                            </div>
                            <SecondaryTaskGrid data={taskList} method="month" onAddBack={addbackHandler} dependency={[deleteTask, addBackTask]} />
                        </TabPanel>

                        <TabPanel value={value} index={4}>
                            <div className={classes.tabDesc}>
                                <h3>All finished tasks of all time.</h3>
                                <p><strong>Tip: </strong>Click on any of the finished tasks to mark them as undone.</p>
                            </div>
                            <SecondaryTaskGrid data={taskList} method="all time" onAddBack={addbackHandler} dependency={[deleteTask, addBackTask]} />
                        </TabPanel>
                        
                        </Box>
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