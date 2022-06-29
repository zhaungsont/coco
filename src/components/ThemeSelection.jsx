import React from 'react'
import classes from "./ThemeSelection.module.css";
import { useBG } from "../contexts/BackgroundContext";

export default function ThemeSelection() {

    const { modeCTX, bgURLArray, modeSelected, lightBGSelected, darkBGSelected, bgLightCTX, bgDarkCTX } = useBG();

    // https://stackoverflow.com/questions/8683528/embed-image-in-a-button-element
    return (
        <div className={classes.themeSelection}>

            <div className={classes.modeSelection}>
            <h3>Preferred Mode</h3>
                <div className={classes.imgSelection}>

                    {/* Currently the values and srcs are hard-coded, no good.
                        Will change this in future updates.
                     */}

                    <div className={classes.imgItem}>
                        <input value="0" onClick={e => modeCTX(e)} id='light' className={`${classes.modePhoto} ${modeSelected == 0 && classes.modeFocusStyle}`} type="image" src="https://cdn-icons-png.flaticon.com/512/3917/3917805.png" />
                        <label htmlFor='light'>Light</label>
                    </div>
                    <div className={classes.imgItem}>
                        <input value="1" onClick={e => modeCTX(e)} id='dark' className={`${classes.modePhoto} ${modeSelected == 1 && classes.modeFocusStyle}`} type="image" src="https://cdn-icons-png.flaticon.com/512/547/547433.png" />
                        <label htmlFor='dark'>Dark</label>
                    </div>
                    <div className={classes.imgItem}>
                        <input value="2" onClick={e => modeCTX(e)} id='auto' className={`${classes.modePhoto} ${modeSelected == 2 && classes.modeFocusStyle}`} type="image" src="https://cdn-icons-png.flaticon.com/512/1312/1312343.png" />
                        <label htmlFor='auto'>Auto</label>
                    </div>

                </div>
                    {/* <p className={classes.nani}>
                        
                    </p> */}
            </div>

            <div className={classes.bgSelection}>
                <h3>Background (Light)</h3>
                    <div className={classes.imgSelection}>
                        {bgURLArray.map((url)=><input onClick={e => bgLightCTX(e)} value={bgURLArray.indexOf(url)} id='auto' key={bgURLArray.indexOf(url)} className={`${classes.themePhoto} ${lightBGSelected == bgURLArray.indexOf(url) && classes.onFocusStyle}`} type="image" src={url} />)}
                        {/* {bgURLArray.map(url => <p key={bgURLArray.indexOf(url)}>{bgURLArray.indexOf(url)}</p>)} */}
                    </div>
                <h3>Background (Dark)</h3>
                <div className={classes.imgSelection}>
                    {bgURLArray.map((url)=><input onClick={e => bgDarkCTX(e)} value={bgURLArray.indexOf(url)} id='auto' key={bgURLArray.indexOf(url)} className={`${classes.themePhoto} ${darkBGSelected == bgURLArray.indexOf(url) && classes.onFocusStyle}`} type="image" src={url} />)}
                </div>
            </div>
            
        </div>
    )
}
