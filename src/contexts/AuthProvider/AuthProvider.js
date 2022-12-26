import React, { createContext, useContext, useEffect, useState } from "react";
import app from './../../firebase/firebase.config';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";



const AuthContext = createContext();
const auth = getAuth(app);

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const userProfileUpdate = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    };
    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const registerAndLoginWithProvider = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const values = {
        user,
        setUser,
        loading,
        userProfileUpdate,
        setLoading,
        createUser,
        logOut,
        loginWithEmailAndPassword,
        registerAndLoginWithProvider,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
