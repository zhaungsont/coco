import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from "../contexts/AuthContext";

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

    function bgLightCTX(e){
        if (e !== undefined){
            const lightBG = e.target.value;
            // to update the currently selected option with bg color with className
            setLightBGSelected(e.target.value);
            console.log(e.target.value)
        }
    }

    function bgDarkCTX(e){
        const darkBG = e.target.value;
        // to update the currently selected option with bg color with className
        setDarkBGSelected(e.target.value);
        console.log(e.target.value)
    }

    // useEffect(()=>{
    //     const bgURLs = [
    //         'https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //         'https://images.pexels.com/photos/533937/pexels-photo-533937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //         'https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //         'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //         'https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //         'https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    //     ];
    // }, [])


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
