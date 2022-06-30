import React, { useContext, useEffect, useState } from 'react'
import { auth, database, storage } from "../Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";

import { onValue, ref as DBRef, set } from "firebase/database";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPhoto, setCurrentPhoto] = useState('')
    const [status, setStatus] = useState('')

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        setStreakModal(true);
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
        const imageRef = ref(storage, `image/${currentUser.uid}/pfp`)
        return uploadBytes(imageRef, image)
    }

    function updateStatus(status){
        const statusObj = {status: status}
        console.log('about to update stat: ' + status)
        set(DBRef(database, `settings/${currentUser.uid}/status`), statusObj);
    }

    function setUserImage(){
        const ImgListRef = ref(storage, `image/${currentUser.uid}/`);
        return listAll(ImgListRef)
    }

    const [streakModal, setStreakModal] = useState(true);

    useEffect(()=>{
        const unsubsribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setIsLoading(false);
        });
        return unsubsribe;
    }, []);

    


    const value = { 
        currentUser, 
        signup, 
        login, 
        logout, 
        resetPassword,
        updateEmail,
        updatePassword,
        updateUserName,
        updateUserImage,
        setUserImage,
        updateStatus,
        status,

        streakModal,
        setStreakModal,
    }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}
