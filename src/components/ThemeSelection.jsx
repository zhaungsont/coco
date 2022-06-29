import React from 'react'
import classes from "./ThemeSelection.module.css";
import { useBG } from "../contexts/BackgroundContext";

export default function ThemeSelection() {

    const { modeCTX, bgURLArray, modeSelected, lightBGSelected, darkBGSelected, bgLightCTX, bgDarkCTX } = useBG();
    // const bgURLArray = [
    //     'https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/533937/pexels-photo-533937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    // ];

    // let x = 0;
    // while (x < 6){
    //     bgURLArray.push('https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    //     x++;
    // }

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
                        <input value="0" onClick={e => modeCTX(e)} id='light' className={`${classes.themePhoto} ${modeSelected == 0 && classes.onFocusStyle}`} type="image" src="https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        <label htmlFor='light'>Light</label>
                    </div>
                    <div className={classes.imgItem}>
                        <input value="1" onClick={e => modeCTX(e)} id='dark' className={`${classes.themePhoto} ${modeSelected == 1 && classes.onFocusStyle}`} type="image" src="https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        <label htmlFor='dark'>Dark</label>
                    </div>
                    <div className={classes.imgItem}>
                        <input value="2" onClick={e => modeCTX(e)} id='auto' className={`${classes.themePhoto} ${modeSelected == 2 && classes.onFocusStyle}`} type="image" src="https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        <label htmlFor='auto'>Auto</label>
                    </div>
                </div>
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
