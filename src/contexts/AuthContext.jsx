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

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email);
    }

    function updatePassword(password){
        return currentUser.updatePassword(password);
    }

    function updateUserName(username){
        return currentUser.updateProfile({displayName: username})
    }

    function updateUserImage(image){
        return currentUser.updateProfile(currentUser, {photoURL: image})
    }

    useEffect(()=>{
        const unsubsribe = auth.onAuthStateChanged(user => {
            console.log('auth state changed! user is now')
            console.log(user);
            setCurrentUser(user);
            setIsLoading(false);
        });
        return unsubsribe;
    }, [])

    const value = { 
        currentUser, 
        signup, 
        login, 
        logout, 
        resetPassword,
        updateEmail,
        updatePassword,
        updateUserName,
        updateUserImage
    }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}
