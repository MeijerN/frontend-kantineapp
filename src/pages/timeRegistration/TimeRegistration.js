import styles from './TimeRegistration.module.css'
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import getLocation from "../../helpers/getLocation";
import {AuthContext} from "../../context/AuthContext";
//Firebase imports
import {collection, doc, getDoc, getDocs, setDoc, updateDoc, where, query, addDoc} from "firebase/firestore";
import {db} from "../../Firebase";


function TimeRegistration({setCurrentPage}) {

    //State management
    const [error, setError] = React.useState({error: false, message: ""});
    const [loading, toggleLoading] = React.useState(false);
    const [session, setSession] = React.useState({session:{active: false}});
    const [workAround, toggleWorkAround] = React.useState(false);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Urenregistratie")
        setError({error: false, message: ""});
        toggleLoading(true);

        async function fetchActiveRegistration() {
            try {
                const q = query(collection(db, "sessions"), where("session", "==", {active: true, id: user.id}));
                // Update Firestore task document
                const querySnapshot = await getDocs(q);
                // console.log(querySnapshot.data());
                querySnapshot.forEach((doc) => {
                    const sessionArray = [];
                    sessionArray.push(doc.data());
                    console.log(sessionArray)
                    if (sessionArray.length === 1) {
                        console.log(sessionArray)
                        setSession({
                            loginTime: sessionArray[0].loginTime,
                            session: {
                                id: sessionArray[0].session.id,
                                active: sessionArray[0].session.active,
                            }
                        })
                    }
                })

            } catch (e) {
                console.error(e);
                setError({error: true, message: "Er is iets misgegaan bij het inklokken. Probeer het opnieuw"});
            }
            toggleLoading(false);
        }

        fetchActiveRegistration();
    }, []);

    async function startRegistration() {
        const time = new Date().toLocaleString();
        // Create new firebase document with user info and uid as document id
        await addDoc(collection(db, "sessions"), {
            loginTime: time,
            session: {
                id: user.id,
                active: true,
            },
        });
        setSession({
            loginTime: time,
            session: {
                id: user.id,
                active: true,
            }
        })
    }

    async function stopRegistration() {
        //TODO: hieronder de stappen
        //Firebase:
        // sessie updaten met logoutTime
        // active naar false zetten

        // berekening maken met monthlyHours en totalHours in de state
        // userdetails in firebase updaten
        // state updaten

        // Timer weergeven op de pagina
        // Button weergeven als de locatie onjuiste is(voor de docenten) -> workaround state voor gebruiken


        // console.log("Stopregistration");
        // const q = query(collection(db, "sessions"), where(session.session, "==", {
        //     active: true,
        //     id: user.id
        // }), where("active", "==", true));
        // // Update Firestore task document
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.data());
        // })
        // const time = new Date().toLocaleString();
        // // Create new firebase document with user info and uid as document id
        // await setDoc(doc(db, "sessions", user.id), {
        //     loginTime: time,
        //     active: true,
        // });
        // setSession({
        //     loginTime: time,
        //     active: true,
        // })
    }

    return (
        <InnerOuterContainer>
            <h3 className={styles.h3}>Timer</h3>
            <ContentCard stylingClass="time-registration">
                {loading && !error.error ? <span>Uw locatie wordt opgehaald...</span> :
                    <p className={styles.p}>Je bent momenteel niet ingeklokt</p>}

                {error.error && <span className={styles.error}>{error.message}</span>}

                {session.session.active ?
                    <button disabled={loading} onClick={() => {
                        getLocation(setError, toggleLoading, session, toggleWorkAround, stopRegistration)
                    }} className={styles.button} type="button">Uitklokken
                    </button>
                    :
                    <button disabled={loading} onClick={() => {
                        getLocation(setError, toggleLoading, session, toggleWorkAround, startRegistration)
                    }} className={styles.button} type="button">Inklokken
                    </button>
                }

            </ContentCard>
        </InnerOuterContainer>
    );
}

export default TimeRegistration;