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
    const [modeSelected, setModeSelected] = useState();
    const [lightBGSelected, setLightBGSelected] = useState(0);
    const [darkBGSelected, setDarkBGSelected] = useState(3);
    const [isLoading, setIsLoading] = useState(true);

    function modeCTX(e){
        if (e !== undefined){
            const mode = e.target.value;
            // mode will be '0', '1', '2', 
            // denoting the currently available 3 mode choices,
            // which are "light", "dark", and "auto" respectively.
            console.log(e.target.value);

            // to update the currently selected option with bg color with className
            setModeSelected(e.target.value);

            // set the mode
            // ...
        } 
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

    // Get user preferences from firebase
    useEffect(()=>{
        console.log('proceed to get user pref')
        const lightBGPref = ref(database, `settings/${currentUser.uid}/lightBG`);
        const darkBGPref = ref(database, `settings/${currentUser.uid}/darkBG`);

        onValue(lightBGPref, (snapshot) => {
            const lightBG = snapshot.val().lightBG;
            setLightBGSelected(lightBG);
        });

        onValue(darkBGPref, (snapshot) => {
            const darkBG = snapshot.val().darkBG;
            setDarkBGSelected(darkBG);
        });
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
