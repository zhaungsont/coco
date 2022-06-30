import React, { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './StreakCard.module.css';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useAuth } from '../contexts/AuthContext';

export default function StreakCard(props) {
    const { setStreakModal } = useAuth();
    let width = window.innerWidth > 480 ? true : false;
    // const [showModal, setShowModal] = useState(true)


    return (
        <>
        <Alert onClose={() => {setStreakModal(false)}} icon={false}>

        <div className={classes.bodyWrapper}>
            <lord-icon
                src="https://cdn.lordicon.com/qduilmpq.json"
                trigger="loop"
                colors="primary:#e88c30,secondary:#ee6d66"
                style={{width: width ? "6rem" : "10rem", height: width ? "4rem" : "5rem"}}>
            </lord-icon>
            <span><strong>Clearing Streak!</strong> <br></br>You've been clearing your tasks for <strong>{props.streak} days</strong>! Keep up the good work!</span>
        </div>
        </Alert>
    </>
    )
}


    //     {/* <h3></h3> */}

    // {/* <Modal.Dialog>
    //     <Modal.Body>
    //         <div className={classes.bodyWrapper}>
    //             <lord-icon
    //                 src="https://cdn.lordicon.com/qduilmpq.json"
    //                 trigger="loop"
    //                 colors="primary:#e88c30,secondary:#ee6d66"
    //                 style={{width: "150px", height: "150px"}}>
    //             </lord-icon>
    //             <div>
    //                 <p>Well Done! You have been clearing your to-do tasks for over 5 days!</p>
    //                 <Button variant="secondary" onClick={setShowModal}>
    //                     Awesome!
    //                 </Button>
    //             </div>
    //         </div>
    //     </Modal.Body>
    // </Modal.Dialog> */}