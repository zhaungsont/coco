import React, { useContext, useEffect, useState } from 'react'
import { auth } from "../Firebase";
import { storage } from '../Firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPhoto, setCurrentPhoto] = useState('')

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
        const imageRef = ref(storage, `image/${currentUser.uid}/pfp`)
        uploadBytes(imageRef, image)
        setUserImage();
    }

    function setUserImage(){
        const ImgListRef = ref(storage, `image/${currentUser.uid}/`);
        listAll(ImgListRef).then(res => {
            res.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    console.log(url);
                    currentUser.updateProfile({photoURL: url})
                    .then(()=>{console.log('success')})
                    .catch(()=>{console.log('failed')})
                });
            });
        });
    }


    useEffect(()=>{
        const unsubsribe = auth.onAuthStateChanged(user => {
            console.log('auth state changed! user is now')
            console.log(user);
            setCurrentUser(user);
            setIsLoading(false);
        });
        return unsubsribe;
    }, []);

    // useEffect(()=>{
    //     if (currentUser !== undefined){
    //         const ImgListRef = ref(storage, `image/${currentUser.uid}/`)
    //         listAll(ImgListRef).then(res => {
    //             res.items.forEach(item => {
    //                 getDownloadURL(item).then(url => {
    //                     setCurrentPhoto(url);
    //                     console.log(url)
    //                 })
    //             })
    //         })
    //     }
    // }, []);

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
