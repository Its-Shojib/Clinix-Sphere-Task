import { createContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'

import auth from "../Firebase/Firebase.config";
import useAxios from "../Hooks/useAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(false);
    let googleProvider = new GoogleAuthProvider();
    let axiosRoot = useAxios();

    let createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    let SignInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    let Logout = () => {
        setLoading(false);
        return signOut(auth);
    }
    let googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    let updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }

    useEffect(() => {
        let unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('observing: ', currentUser?.displayName);
            let userInfo = {
                email: currentUser?.email
            }
            if (currentUser) {
                axiosRoot.post('/jwt', userInfo,)
                    .then(() => {
                        console.log('JWT logged');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {
                axiosRoot.post('/logout', userInfo)
                    .then(() => {
                        console.log("Jwt Authentication Hitted!")
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

        })
        return () => {
            unSubscribe();
        }
    }, [axiosRoot])


    let authInfo = {
        user,
        createUser,
        SignInUser,
        Logout,
        googleSignIn,
        loading,
        setUser,
        updateUserProfile,
        setLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );

};
export default AuthProvider;