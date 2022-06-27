import React, {createContext, useEffect, useState} from 'react';
import styles from './AuthContext.module.css'
// Firebase imports
import {doc, setDoc} from "firebase/firestore";
import {db} from "../Firebase";
import {auth} from '../Firebase'

import {getAuth, deleteUser} from "firebase/auth";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    //State management
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const history = useHistory();


    //TODO: onmount useState schrijven met OnAuthChange functie om bij refresh de user op te halen

    // Create firebase document with user information after registration
    async function createUserInformation(userCredential, data) {
        console.log("Usercredential context: ", userCredential);
        console.log("Data context: ", data);
        try {
            // Create firebase document with user uid ass document id
            const userData = await setDoc(doc(db, "users", userCredential.user.uid), {
                id: userCredential.user.uid,
                firstName: data["first-name"],
                lastName: data["last-name"],
                email: data.email,
                function: "vrijwilliger",
                specialties: ["Voeg je specialiteiten toe!"],
            });
            //TODO: zet de gegevens in de state
            toggleAuth({
                isAuth: true,
                user: {
                    id: userCredential.user.uid,
                    firstName: data["first-name"],
                    lastName: data["last-name"],
                    email: data.email,
                    function: "vrijwilliger",
                    specialties: ["Voeg je specialiteiten toe!"],
                },
                status: 'done',
            })
            history.push("/openstaande-taken");
        } catch (e) {
            console.error(e);
            console.log("Catch in context aangesproken")
            // Delete firebase user so user can try again with same email
            await deleteUser(userCredential.user);
            toggleAuth({
                ...auth,
                status: "error",
            })
        }
    }
    console.log(auth);
    function login(uid, email) {
        console.log("Login authcontext triggered");
        // 2. Haal, indien nodig, de gebruikersgegevens uit de backend op:
        // async function getData() {
        // };

        // 3. Zet de gebruikersgegevens (MAAR NIET DE JWT) in de context state:
        // toggleAuth({
        //     ...auth,
        //     isAuth: true,
        //     user: {
        //         email: decodedToken.email,
        //         id: decodedToken.sub,
        //     },
        //     status: 'done',
        // });

        console.log('De gebruiker is ingelogd!');
        // history.push('/profile');
    }

    function logout() {
        console.log("Login authcontext triggered");
        // toggleAuth({
        //     isAuth: false,
        //     user: null,
        //     status: 'done',
        // });

        // history.push('/');
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
        createUserInformation: createUserInformation,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status !== 'error' && children}
            {/*/!*{auth.status === 'done' ? children : <p>Loading...</p>}*!/*/}
            {/*{auth.status === 'done' && children}*/}
            {/*{auth.status === 'pending' && <p>Loading...</p>}*/}
            {auth.status === 'error' && <p className={styles.error}>Oeps, er ging iets mis! Ververs de pagina.</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;