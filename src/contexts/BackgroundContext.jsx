import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from "../contexts/AuthContext";

// Firebase
import Firebase, {auth, database} from "../Firebase";
import { ref, set, push, onValue, update } from "firebase/database";

const BGContext = createContext()

export function useBG(){
    return useContext(BGContext);
}

export function BackgroundProvider({ children }) {
    
    const { currentUser } = useAuth();

    const [bgURLArray, setBgURLArray] = useState([
        'https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/533937/pexels-photo-533937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]);
    const [modeSelected, setModeSelected] = useState(2);
    const [lightBGSelected, setLightBGSelected] = useState(0);
    const [darkBGSelected, setDarkBGSelected] = useState(3);

    function modeCTX(val){
            const mode = val;
            // const mode = e.target.value;
            // mode will be '0', '1', '2', 
            // denoting the currently available 3 mode choices,
            // which are "light", "dark", and "auto" respectively.

            // to update the currently selected option with bg color with className
            setModeSelected(mode);

            // set the mode
            const newMode = {mode: mode};
            set(ref(database, `settings/${currentUser.uid}/mode`), newMode);
        // } 
    }


    // Write or Replace data
    // https://firebase.google.com/docs/database/admin/save-data#node.js_1

    function bgLightCTX(e){
        const lightBG = e.target.value;
        // to update the currently selected option with bg color with className
        setLightBGSelected(e.target.value);
        console.log(e.target.value)

        // update db bgImage
        const newSetting = {lightBG: lightBG}
        set(ref(database, `settings/${currentUser.uid}/lightBG`), newSetting);
    }

    function bgDarkCTX(e){
        const darkBG = e.target.value;
        // to update the currently selected option with bg color with className
        setDarkBGSelected(e.target.value);
        console.log(e.target.value)

        // update db bgImage
        const newSetting = {darkBG: darkBG}
        set(ref(database, `settings/${currentUser.uid}/darkBG`), newSetting);
    }

    function getUserPref(){
        try {
            const lightBGPref = ref(database, `settings/${currentUser.uid}/lightBG`);
            onValue(lightBGPref, (snapshot) => {
                try {
                    const lightBG = snapshot.val().lightBG;
                    console.log('got user light bg setting: ' + lightBG);
                    console.log('setting now...')
                    setLightBGSelected(lightBG);
                } catch {
                    console.log('no record of light background image. Will not do anything.')
                }
            });
        } catch {
        }

        try {
            const darkBGPref = ref(database, `settings/${currentUser.uid}/darkBG`) || '4';
            onValue(darkBGPref, (snapshot) => {
                try {
                    const darkBG = snapshot.val().darkBG;
                    console.log('got user dark bg setting: ' + darkBG);
                    console.log('setting now...')
                    setDarkBGSelected(darkBG);
    
                    } catch {
                        console.log('no record of dark background image. Will not do anything.');
                    }
                });
        } catch {
        }

        try {
            const modePref = ref(database, `settings/${currentUser.uid}/mode`);
            onValue(modePref, (snapshot) => {
                try {
                    const mode = snapshot.val().mode;
                    console.log('got user mode setting: ' + mode);
                    console.log('setting now...')
                    setModeSelected(mode);
    
                } catch {
                    console.log('no record of user mode settings. Will not do anything.')
                }
            });
        } catch {
        }
    }

    // Get user preferences from firebase
    useEffect(()=>{
        console.log('proceed to get user pref')
        getUserPref();
    }, [])


    const value={
        bgURLArray,
        modeSelected,
        modeCTX,
        setModeSelected,
        lightBGSelected,
        darkBGSelected,
        bgLightCTX,
        bgDarkCTX
    }
    
    return (
        <BGContext.Provider value={value}>
            {children}
        </BGContext.Provider>
    )
}
