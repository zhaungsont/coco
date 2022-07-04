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
import StreakCard from "./StreakCard";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from '@mui/material/styles';

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
import UndoneTasks from "./UndoneTasks";
import SecondaryTaskGrid from "./SecondaryTaskGrid";
import C1 from "./C1";
import C2 from "./C2";
import C3 from "./C3";
import C4 from "./C4";

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

    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    // Tabs
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //////

    const { currentUser } = useAuth();

    let width = window.innerWidth > 480 ? true : false;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const inputTask = useRef('');
    // const inputTag = useRef('');
    const [catSelect, setCatSelect] = useState('');
    const [openNewCat, setOpenNewCat] = useState(false);
    const [catFill, setCatFill] = useState('');

    const [taskList, setTaskList] = useState([]);
    const [tempCounter, setTempCounter] = useState(1);
    const [finishTask, setfinishTask] = useState([]);
    const [addBackTask, setAddBackTask] = useState([]);

    const [quoteIndex, setQuoteIndex] = useState(0);

    // Add new Task
    function submitHandler(){
        if (inputTask.current.value.trim() !== ''){
            const taskName = inputTask.current.value.trim();
            // const taskTag = inputTag.current.value;
            let taskTag = '';
            console.log('submit cat: ' + catFill)
            if (catFill){
                taskTag = catFill;
            } else {
                taskTag = catSelect
            }
            console.log('SUBMITTED! ' + taskName);
            const date = new Date();
            const milliseconds = date.getTime()
            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const weekday = weekdays[date.getDay()];
            const day = date.getDate()

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = months[date.getMonth()];

            const year = date.getFullYear();
            const seconds = date.getSeconds();
            const minutes = date.getMinutes();
            const hour = date.getHours();
            const newTask = {name: taskName, syear: year, smonth: month, sday: day, sweekday: weekday, shour: hour, sminutes: minutes, sseconds: seconds, smilliseconds: milliseconds, tag: taskTag, done: false}
            
            // new way
            const taskListRef = ref(database, `tasks/${currentUser.uid}`);
            const newTaskRef = push(taskListRef);
            set(newTaskRef, newTask);

            // praise the stackoverflow post that points me to this page: 
            // https://firebase.google.com/docs/database/web/lists-of-data

            // clear input field. (I know we should generally avoid controlling forms with ref but here it works!)
            inputTask.current.value = '';

            setCatSelect('');
            setCatFill('');
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
        });

    }, [])

    function checkHandler(data){
        console.log('proceed to mark as finish ' + data);
        setfinishTask(data);
    }

    // Update Marked Tasks with Done Date Info
    useEffect(()=>{
        const cleaner = setTimeout(() => {

            const date = new Date();
            const milliseconds = date.getTime()
            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const weekday = weekdays[date.getDay()];
            const day = date.getDate()

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = months[date.getMonth()];

            const year = date.getFullYear();
            const seconds = date.getSeconds();
            const minutes = date.getMinutes();
            const hour = date.getHours();

            const doneInfo = {
                eyear: year,
                emonth: month,
                eday: day,
                eweekday: weekday,
                ehour: hour,
                eminutes: minutes,
                eseconds: seconds,
                emilliseconds: milliseconds,
                done: true
            };
            finishTask.map(task => { update(ref(database, `tasks/${currentUser.uid}/${task}`), doneInfo) })

        }, 500);
        return (()=> clearTimeout(cleaner));
    }, [finishTask]);


    function addbackHandler(data){
        console.log('proceed to add ' + data + " back.");
        setAddBackTask(data);
    }

    // Add back task (Mark as undone)
    useEffect(()=>{
        const cleaner = setTimeout(() => {

            const doneInfo = {
                eyear: null,
                emonth: null,
                eday: null,
                eweekday: null,
                ehour: null,
                eminutes: null,
                eseconds: null,
                emilliseconds: null,
                done: false
            };

            addBackTask.map(task => {
                update(ref(database, `tasks/${currentUser.uid}/${task}`), doneInfo)
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

    useEffect(()=>{
        setQuoteIndex(Math.floor(Math.random() * quotes.length));

    }, []);

    // Some Task Fax
    const totalNumberOfTasks = taskList.length;
    const totalDoneTasks = taskList.filter(t => t.done === true).length;

    const sampleDate = new Date();
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1);
    }
    const firstDayCurrentMonth = getFirstDayOfMonth(
        sampleDate.getFullYear(),
        sampleDate.getMonth(),
    );
    const startOfMonth = new Date(firstDayCurrentMonth);
    const startOfMonthInMili = startOfMonth.getTime();
    const totalTasksThisMonth = taskList.filter(t => t.smilliseconds > startOfMonthInMili).length;
    const totalTasksDoneThisMonth = taskList.filter(t => t.emilliseconds > startOfMonthInMili && t.done === true).length;

    function getStartOfDay(year, month, day){
        return new Date(year, month, day);
    }

    const startOfDay = getStartOfDay(
        sampleDate.getFullYear(),
        sampleDate.getMonth(),
        sampleDate.getDate()
    );

    const startOfDayInMili = startOfDay.getTime();
    const tasksCreatedToday = taskList.filter(t => t.smilliseconds > startOfDayInMili).length;

    // this statement is not entirely true! is planned to be fixed in future updates.
    const tasksDoneToday = taskList.filter(t => t.done === true && t.emilliseconds > startOfDayInMili).length;

    const undoneTasks = taskList.filter(t => t.done === false).length;

    const sevenDaysAgo = new Date(sampleDate.getTime() - 604800000);

    const tasksDoneLastSevenDays = taskList.filter(t => t.emilliseconds > sevenDaysAgo).length;

    const [streak, setStreak] = useState("0");
    useEffect(()=>{
        // Check for Task Streak
        const tasksDoneYesterday = (taskList.filter(t => t.done && t.emilliseconds > startOfDayInMili - 86400000 && t.emilliseconds < startOfDayInMili).length > 0 ? true : false);
        const tasksDone2DaysAgo = (taskList.filter(t => t.done && t.emilliseconds > startOfDayInMili - 86400000 * 2 && t.emilliseconds < startOfDayInMili - 86400000).length > 0 ? true : false);
        const tasksDone3DaysAgo = (taskList.filter(t => t.done && t.emilliseconds > startOfDayInMili - 86400000 * 3 && t.emilliseconds < startOfDayInMili - 86400000 * 2).length > 0 ? true : false);
        const tasksDone4DaysAgo = (taskList.filter(t => t.done && t.emilliseconds > startOfDayInMili - 86400000 * 4 && t.emilliseconds < startOfDayInMili - 86400000 * 3).length > 0 ? true : false);
        const tasksDone5DaysAgo = (taskList.filter(t => t.done && t.emilliseconds > startOfDayInMili - 86400000 * 5 && t.emilliseconds < startOfDayInMili - 86400000 * 4).length > 0 ? true : false);
        const tasksDone6DaysAgo = (taskList.filter(t => t.done && t.emilliseconds > startOfDayInMili - 86400000 * 6 && t.emilliseconds < startOfDayInMili - 86400000 * 5).length > 0 ? true : false);
        const tasksDone7DaysAgo = (taskList.filter(t => t.done && t.emilliseconds > startOfDayInMili - 86400000 * 7 && t.emilliseconds < startOfDayInMili - 86400000 * 6).length > 0 ? true : false);

        if (tasksDoneToday && tasksDoneYesterday && tasksDone2DaysAgo && tasksDone3DaysAgo && tasksDone4DaysAgo && tasksDone5DaysAgo && tasksDone6DaysAgo && tasksDone7DaysAgo){
            // 7-streak
            setStreak("over 7");
        } else if (tasksDoneToday && tasksDoneYesterday && tasksDone2DaysAgo && tasksDone3DaysAgo && tasksDone4DaysAgo && tasksDone5DaysAgo && tasksDone6DaysAgo){
            // 7-streak
            setStreak("7");
        } else if (tasksDoneToday && tasksDoneYesterday && tasksDone2DaysAgo && tasksDone3DaysAgo && tasksDone4DaysAgo && tasksDone5DaysAgo){
            // 6-streak
            setStreak("6");
        } else if (tasksDoneToday && tasksDoneYesterday && tasksDone2DaysAgo && tasksDone3DaysAgo && tasksDone4DaysAgo){
            // 5-streak
            setStreak("5");
        } else if (tasksDoneToday && tasksDoneYesterday && tasksDone2DaysAgo && tasksDone3DaysAgo){
            // 4-streak
            setStreak("4");
        } else if (tasksDoneToday && tasksDoneYesterday && tasksDone2DaysAgo){
            // 3-streak
            setStreak("3");
        } else {
            setStreak("");
        }

    }, [taskList]);


    function handleCatSelectChange(e){
        const selectVal = e.target.value;
        if (selectVal === '!new task!'){
            setOpenNewCat(true);
            setCatSelect('');
            console.log('cat select is cleared')
        } 
        else {
            setCatSelect(selectVal);
            console.log(selectVal)
        }
    }

    function cancelNewCatHandlerWithBlank(){
        // if the textfiel is blank, cancel it. Otherwise do nothing.
        if (!catFill){
            setOpenNewCat(false);
            setCatFill('');
        }
    }

    function cancelNewCatHandlerWithEsc(){
        setOpenNewCat(false);
        setCatFill('');
    }

    function handleNewCatName(e){
        setCatFill(e.target.value);
        console.log(e.target.value);
    }

    return(
        <>
            <IconButton onClick={handleShow}>
                <AccountCircleRoundedIcon className={classes.userBtn} fontSize="large" />
            </IconButton>

        <Sidebar show={show} handleClose={handleClose}  />

        <section id="content-structure">
            <div className={darkMode ? `dark-frosted-glass` : `light-frosted-glass`}>
                <div className={classes.headerWrapper}>
                    <div className="content-title">
                        <h1 className={classes.title}>{greet}<br></br>{currentUser.displayName ? currentUser.displayName : 'Cocoer'}.</h1>
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
                    // tagValue={inputTag}
                    // categoryValue={category}
                    onCatSelectChange={handleCatSelectChange}
                    catSelectValue={catSelect}
                    openNewCat={openNewCat}
                    onNewCatFill={handleNewCatName}
                    onCancelNewCatWithBlank={cancelNewCatHandlerWithBlank}
                    onCancelWithEsc={cancelNewCatHandlerWithEsc}
                    />
                    <UndoneTasks data={taskList} />
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
                                <p>{undoneTasks ? <strong>You have {undoneTasks} {undoneTasks > 1 ? 'tasks' : 'task'} remaining. Go ahead and finish them! 💪</strong>
                                : <strong>You have no more unfinished tasks left. Congrats! 🥳</strong>
                                }</p>
                                <p>You created {tasksCreatedToday > 1 ? `${tasksCreatedToday} tasks` : `${tasksCreatedToday} task`} today, finished {tasksDoneToday > 1 ? `${tasksDoneToday} tasks` : `${tasksDoneToday} task`}  today, and in total of {tasksDoneLastSevenDays} done for the past 7 days.</p>

                                <p>You created {totalTasksThisMonth} tasks in total this month, and you have finished {totalTasksDoneThisMonth === totalTasksThisMonth ? "all the" : totalTasksDoneThisMonth} tasks. Awesome!</p>
                                <p><strong>Tip: </strong>Accidentally marked some tasks as done? Simply check them back in in the "Finished Tasks" tabs. <strong>Warning: marking finished tasks as undone again will affect some of your performance evaluation.</strong></p>
                            </div>
                        </TabPanel>
                        
                        <TabPanel value={value} index={1}>
                            <div className={classes.tabDesc}>
                                <h3>Done Today</h3>
                                <p><strong>Tip: </strong>Click on any of the finished tasks to mark them as undone.</p>
                            </div>
                            <SecondaryTaskGrid data={taskList} method="done today" onAddBack={addbackHandler} dependency={[finishTask, addBackTask]} sx={{padding: 0}} />
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                            <div className={classes.tabDesc}>
                                <h3>All finished tasks in the past 7 days.</h3>
                                <p><strong>Tip: </strong>Click on any of the finished tasks to mark them as undone.</p>
                            </div>
                            <SecondaryTaskGrid data={taskList} method="week" onAddBack={addbackHandler} dependency={[finishTask, addBackTask]} />
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            <div className={classes.tabDesc}>
                                <h3>All finished tasks from this month.</h3>
                                <p><strong>Tip: </strong>Click on any of the finished tasks to mark them as undone.</p>
                            </div>
                            <SecondaryTaskGrid data={taskList} method="month" onAddBack={addbackHandler} dependency={[finishTask, addBackTask]} />
                        </TabPanel>

                        <TabPanel value={value} index={4}>
                            <div className={classes.tabDesc}>
                                <h3>All finished tasks of all time.</h3>
                                <p><strong>Tip: </strong>Click on any of the finished tasks to mark them as undone.</p>
                            </div>
                            <SecondaryTaskGrid data={taskList} method="all time" onAddBack={addbackHandler} dependency={[finishTask, addBackTask]} />
                        </TabPanel>
                        
                        </Box>
                    </div>
                        
                    </div>
                    <div className={classes.sideContent}>
                        {!width && 
                        <>
                        <Divider variant="middle" />
                        <br></br>
                        <h2>Performance Analysis</h2>
                        </>
                        }
                        {streak && <StreakCard streak={streak} />}
                        <C4 data={taskList} />
                        <C1 data={taskList} />
                        <div className={classes.lineChart}>
                            <C3 data={taskList} />
                        </div>
                        <div className={classes.pieChart}>
                            <C2 data={taskList} />
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        </>
    )
}