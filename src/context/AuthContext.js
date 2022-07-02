import React, {createContext, useEffect, useState} from 'react';
import styles from './AuthContext.module.css'
// Firebase imports
import {doc, setDoc, getDoc} from "firebase/firestore";
import {authFirebase, db} from "../Firebase";
import {deleteUser, onAuthStateChanged, signOut} from "firebase/auth";
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

    // Check for logged in user on mount cycle and get user information
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authFirebase, (user) => {
            if (user) {

                async function getUserInformation() {
                    try {
                        const docRef = doc(db, "users", user.uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userInformation = docSnap.data();
                            toggleAuth({
                                isAuth: true,
                                user: {
                                    id: userInformation.id,
                                    firstName: userInformation.firstName,
                                    lastName: userInformation.lastName,
                                    email: userInformation.email,
                                    function: userInformation.function,
                                    specialties: userInformation.specialties,
                                },
                                status: 'done',
                            })
                        } else {
                            toggleAuth({
                                ...auth,
                                status: "error",
                            })
                        }
                    } catch (e) {
                        console.error(e);
                        toggleAuth({
                            ...auth,
                            status: "error",
                        })
                    }
                }

                getUserInformation();
            } else {
                // No user was logged in or user just logged out
                toggleAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }

        });
        // Unsubscribe on unmount cycle
        return function cleanUp() {
            unsubscribe();
        }
    }, [])

    // Create firebase document with user information after registration and set auth state
    async function createUserInformation(userCredential, data) {
        try {
            // Create new firebase document with user info and uid as document id
            await setDoc(doc(db, "users", userCredential.user.uid), {
                id: userCredential.user.uid,
                firstName: data["first-name"],
                lastName: data["last-name"],
                email: data.email,
                function: "vrijwilliger",
                specialties: ["Nog geen specialiteiten toegevoegd"],
            });
            toggleAuth({
                isAuth: true,
                user: {
                    id: userCredential.user.uid,
                    firstName: data["first-name"],
                    lastName: data["last-name"],
                    email: data.email,
                    function: "vrijwilliger",
                    specialties: ["Nog geen specialiteiten toegevoegd"],
                },
                status: 'done',
            })
            history.push("/openstaande-taken");
        } catch (e) {
            console.error(e);
            // Delete firebase user so user can try again with same email
            await deleteUser(userCredential.user);
            toggleAuth({
                ...auth,
                status: "error",
            })
        }
    }

    // HOOGSTWAARSCHIJNLIJK NIET NODIG
    // function login(uid, email) {
    //     console.log("Login authcontext triggered");
    //     // 2. Haal, indien nodig, de gebruikersgegevens uit de backend op:
    //     // async function getData() {
    //     // };
    //
    //     // 3. Zet de gebruikersgegevens (MAAR NIET DE JWT) in de context state:
    //     // toggleAuth({
    //     //     ...auth,
    //     //     isAuth: true,
    //     //     user: {
    //     //         email: decodedToken.email,
    //     //         id: decodedToken.sub,
    //     //     },
    //     //     status: 'done',
    //     // });
    //
    //     console.log('De gebruiker is ingelogd!');
    //     // history.push('/profile');
    // }

    // Log user out and let onAuthStateChange() handle the auth state
    async function logout() {
        try {
            await signOut(authFirebase);
        } catch (e) {
            console.error(e);
            toggleAuth({
                ...auth,
                status: "error",
            })
        }
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        // login: login,
        logout: logout,
        createUserInformation: createUserInformation,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' && children}
            {auth.status === 'pending' && <p className={styles.error}>Even geduld...</p>}
            {auth.status === 'error' && <p className={styles.error}>Oeps, er ging iets mis! Ververs de pagina.</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;