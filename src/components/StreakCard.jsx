import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './StreakCard.module.css';

export default function StreakCard() {
    const [showModal, setShowModal] = useState(true)
    return (
        <div>
        {/* <h3></h3> */}

    <Modal.Dialog>
        <Modal.Header closeButton>
            <Modal.Title>Task Streak!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className={classes.bodyWrapper}>
                <lord-icon
                    src="https://cdn.lordicon.com/qduilmpq.json"
                    trigger="loop"
                    colors="primary:#e88c30,secondary:#ee6d66"
                    style={{width: "150px", height: "150px"}}>
                </lord-icon>

                <p>Well Done! You have been clearing your to-do tasks for over 5 days!</p>
            </div>

        </Modal.Body>

    </Modal.Dialog>
    </div>
    )
}
