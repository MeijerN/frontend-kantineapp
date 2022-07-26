import styles from './TimeRegistration.module.css';
import React, {useContext, useEffect} from 'react';
import ContentCard from "../../components/contentCard/ContentCard";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import getLocation from "../../helpers/getLocation";
import {AuthContext} from "../../context/AuthContext";

//Firebase imports
import {collection, doc, getDocs, updateDoc, where, query, addDoc} from "firebase/firestore";
import {db} from "../../Firebase";

function TimeRegistration({setCurrentPage}) {

    //State management
    const [error, setError] = React.useState({error: false, message: ""});
    const [loading, toggleLoading] = React.useState(false);
    const [session, setSession] = React.useState({session: {active: false}});
    const [wrongLocationCard, toggleWrongLocationCard] = React.useState(false);
    const [workAround, toggleWorkAround] = React.useState(false);
    const [timer, setTimer] = React.useState("00:00:00");

    const {user, auth, toggleAuth} = useContext(AuthContext);

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Urenregistratie");
        setError({error: false, message: ""});
        toggleLoading(true);

        async function fetchActiveRegistration() {
            try {
                const q = query(collection(db, "sessions"), where("session", "==", {active: true, id: user.id}));
                // Update Firestore task document
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const sessionArray = [];
                    sessionArray.push(doc.data());
                    if (sessionArray.length === 1) {
                        setSession({
                            docId: sessionArray[0].docId,
                            loginTime: new Date(sessionArray[0].loginTime.seconds * 1000),
                            session: {
                                id: sessionArray[0].session.id,
                                active: sessionArray[0].session.active,
                            }
                        });
                    }
                });
            } catch (e) {
                console.error(e);
                setError({error: true, message: "Er is iets misgegaan bij het inklokken. Probeer het opnieuw"});
            }
            toggleLoading(false);
        }

        fetchActiveRegistration();
    }, []);

    //Start timer interval on session.loginTime state change
    useEffect(() => {
        const interval = setInterval(() => {
            if (!session.loginTime) {
                clearInterval(interval);
            } else {
                const format = {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                }
                const calculatedTimeInSeconds = (Math.floor(new Date().getTime() / 1000) - (Math.floor(new Date(session.loginTime).getTime() / 1000)));
                const hours = Math.floor(calculatedTimeInSeconds / 3600);
                const minutes = Math.floor(calculatedTimeInSeconds / 60) % 60;
                const seconds = Math.floor(calculatedTimeInSeconds % 60);

                setTimer(`${hours.toLocaleString("nl-NL", format)}:${minutes.toLocaleString("nl-NL", format)}:${seconds.toLocaleString("nl-NL", format)}`);
            }
        }, 1000);
        // Clear interval on unmount
        return function cleanUp() {
            clearInterval(interval);
        }
    }, [session.loginTime]);

    async function startRegistration() {
        setError({error: false, message: ""})
        try {
            const time = new Date();
            // Create new firebase document with user info and uid as document id
            const docRef = await addDoc(collection(db, "sessions"), {
                loginTime: time,
                session: {
                    id: user.id,
                    active: true,
                },
            });
            // Update Firebase session document with docId for easy future lookups
            const taskRef = doc(db, "sessions", docRef._key.path.segments[1]);
            await updateDoc(taskRef, {
                docId: docRef._key.path.segments[1],
            });
            setSession({
                docId: docRef._key.path.segments[1],
                loginTime: time,
                session: {
                    id: user.id,
                    active: true,
                }
            });
        } catch (e) {
            console.error(e);
            setError({
                error: true,
                message: "Er ging iets mis bij het starten van de registratie. Probeer het opnieuw"
            });
        }
        toggleWorkAround(false);
        toggleLoading(false);
    }

    async function stopRegistration(wrongLocation) {
        try {
            // Create timestamp for logout
            const logoutTime = new Date;
            if (wrongLocation) {
                // Update Firebase session document
                // Create Firestore reference to session document
                const sessionRef = doc(db, "sessions", session.docId);

                // Update Firestore session document
                await updateDoc(sessionRef, {
                    month: new Date().getMonth(),
                    logoutTime: logoutTime,
                    wrongLocation: true,
                    session: {
                        id: user.id,
                        active: false,
                    },
                });
                setSession({
                    session: {
                        active: false,
                    }
                });
            } else {
                // Update Firebase session document
                // Create Firestore reference to session document
                const sessionRef = doc(db, "sessions", session.docId);
                // Update Firestore session document
                await updateDoc(sessionRef, {
                    month: new Date().getMonth(),
                    logoutTime: logoutTime,
                    session: {
                        id: user.id,
                        active: false,
                    },
                });
                // Update totalTime in Firebase user information
                // Create Firestore reference to task document
                const userRef = doc(db, "users", user.id);
                // Update Firestore task document
                await updateDoc(userRef, {
                    monthlyHours: 0,
                    totalTime: user.totalTime + Math.floor((logoutTime.getTime() - session.loginTime.getTime()) / 1000),
                });
                setSession({
                    session: {
                        active: false,
                    }
                });
                toggleAuth({
                    ...auth,
                    user: {
                        ...user,
                        monthlyHours: 0,
                        totalTime: user.totalTime + Math.floor((logoutTime.getTime() - session.loginTime.getTime()) / 1000),
                    },
                });
                toggleWorkAround(false);
            }
            toggleWrongLocationCard(false);
            toggleWorkAround(false);
        } catch (e) {
            console.error(e);
            setError({
                error: true,
                message: "Er ging iets mis bij het afsluiten van de registratie. Probeer het opnieuw"
            });
        }
        toggleLoading(false);
    }

    return (
        <InnerOuterContainer>
            <h3 className={styles.h3}>Timer</h3>
            <ContentCard stylingClass="time-registration">
                {loading && !error.error && <span className={styles.p}>Uw locatie wordt opgehaald...</span>}
                {session.loginTime && !loading && !error.error && <span className={styles.counter}>{timer}</span>}
                {!session.loginTime && !loading && !error.error && <p className={styles.p}>Je bent momenteel niet ingeklokt</p>}
                {error.error && <span className={styles.error}>{error.message}</span>}

                {session.session.active ?
                    <button
                        disabled={loading}
                        onClick={() => {
                            getLocation(setError, toggleLoading, session, toggleWorkAround, stopRegistration, toggleWrongLocationCard)
                        }}
                        className={styles.button} type="button">Uitklokken
                    </button>
                    :
                    <button
                        disabled={loading}
                        onClick={() => {
                            getLocation(setError, toggleLoading, session, toggleWorkAround, startRegistration, toggleWrongLocationCard)
                        }}
                        className={styles.button} type="button">Inklokken
                    </button>
                }
                {wrongLocationCard &&
                    <span className={styles["wrong-location"]}>
                        <p>Uw locatie is niet juist, de huidige registratie kan niet afgesloten worden.</p>
                        <p className={styles.p}>Toch op de juiste locatie? Klik op 'Opnieuw proberen.' Vergeten uit te klokken? Klik dan op 'Uitklokken' en neem contact op met uw manager. De huidige uren worden nog niet bijgeschreven.</p>
                        <div className={styles["button-container"]}>
                            <button
                                onClick={() => {
                                    getLocation(setError, toggleLoading, session, toggleWorkAround, stopRegistration, toggleWrongLocationCard)
                                }}
                                className={styles["button-wrong-location"]}>Opnieuw proberen</button>
                            <button
                                onClick={() => {
                                    stopRegistration(true)
                                }}
                                className={styles["button-wrong-location"]}>Uitklokken</button>
                        </div>
                    </span>
                }
            </ContentCard>
            {workAround &&
                <span className={styles["workaround"]}>
                        <p>Content voor de beoordelaar</p>
                        <p className={styles["workaround-text"]}>Met onderstaande knop kunt u de locatieverificatie omzeilen voor beoordelingsdoeleinden.</p>
                    {session.session.active ?
                        <button
                            onClick={() => {
                                stopRegistration(false)
                            }}
                        >
                            Uitklokken
                        </button>
                        :
                        <button
                            onClick={startRegistration}
                        >
                            Inklokken
                        </button>}
                    </span>
            }
        </InnerOuterContainer>
    );
}

export default TimeRegistration;