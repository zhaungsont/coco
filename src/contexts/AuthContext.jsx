import React, { useContext, useEffect, useState } from 'react'
import { auth } from "../Firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(()=>{
        const unsubsriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        setIsLoading(false);
        return unsubsriber;
    }, [])

    const value = { currentUser, signup, login }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}
