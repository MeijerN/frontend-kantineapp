import React, {useContext} from 'react';
import styles from './Register.module.css';
import SubmitButton from '../../components/submitButton/SubmitButton'
import {Link, useHistory} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {AuthContext} from "../../context/AuthContext";
// Firebase imports
import {auth} from "../../Firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {db} from '../../Firebase'
import {doc, setDoc} from "firebase/firestore";
import SelectElement from "../../components/selectElement/SelectElement";
import Select from "react-select";


function RegisterPage() {

    // State management
    const [submitButton, toggleSubmitButton] = React.useState(false);
    const [error, toggleError] = React.useState(false);

    const {register, handleSubmit, reset, formState: {errors}, watch} = useForm();
    const history = useHistory();
    const {createUserInformation} = useContext(AuthContext);

    // React hook forms Watcher for password match check
    const checkPassword = watch('password');

    // Specialities array
    // MOET UIT DE DATABASE GAAN KOMEN!!
    const options = [
        {value: 'sanitair', label: 'Sanitair'},
        {value: 'elektra', label: 'Elektra'},
        {value: 'schilderwerk', label: 'Schilderwerk'},
        {value: 'bouwen', label: 'Bouwen'},
        {value: 'dakwerk', label: 'Dakwerk'},
        {value: 'slopen', label: 'Slopen'},
        {value: 'tuin', label: 'Tuin'},
    ]

    // Remove blue border in <Select/> element when in focus
    const customStyle = {
        control: provided => ({
            ...provided,
            boxShadow: 'none',
            border: "solid black 1px",
            borderRadius: "8px",
        })
    }

    async function registerUser(data) {
        toggleSubmitButton(true);
        toggleError(false);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            console.log("Usercredential ", userCredential);
            console.log("Usercredential.user ", userCredential.user);
            if(userCredential) {
                createUserInformation(userCredential, data);
            }
            // Email, voornaam en achternaam moeten naar AuthContext
            history.push("/");
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        reset();
        toggleSubmitButton(false);
    }

    return (
        <div className={styles.main}>
            <div className={styles["form-card"]}>
                <h1 className={styles.h1}>Registreren</h1>
                <form className={styles.form} onSubmit={handleSubmit(registerUser)}>
                    <input
                        type="text"
                        placeholder="Voornaam"
                        {...register("first-name", {
                            required: "Vul uw voornaam in",
                        })}
                        className={styles["login-registration"]}
                    />
                    <input
                        type="text"
                        placeholder="Achternaam"
                        {...register("last-name", {
                            required: "Vul uw achternaam in",
                        })}
                        className={styles["login-registration"]}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        {...register("email", {
                            required: "Vul uw email in",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Ongeldige email",
                            }
                        })}
                        className={styles["login-registration"]}
                    />
                    <input
                        type="password"
                        placeholder="Wachtwoord"
                        {...register("password", {
                            minLength: {
                                value: 6,
                                message: "Het wachtwoord moet uit minimaal 6 karakters bestaan",
                            },
                            required: "Vul een wachtwoord in",
                        })}
                        className={styles["login-registration"]}
                    />
                    <input
                        type="password"
                        placeholder="Herhaal wachtwoord"
                        {...register("password-check", {
                            required: "Vul opnieuw uw wachtwoord in",
                            validate: value =>
                                value === checkPassword || "Wachtwoorden komen niet overeen"
                        })}
                        className={styles["login-registration"]}
                    />

                    {/*<InputField*/}
                    {/*    type="text"*/}
                    {/*    placeholder="Voornaam"*/}
                    {/*    stylingClass="login-registration"*/}
                    {/*    {...register("first-name")}*/}
                    {/*/>*/}
                    {/*<InputField*/}
                    {/*    type="text"*/}
                    {/*    placeholder="Achternaam"*/}
                    {/*    stylingClass="login-registration"*/}
                    {/*    {...register("last-name")}*/}
                    {/*/>*/}
                    {/*<InputField*/}
                    {/*    type="email"*/}
                    {/*    placeholder="Email"*/}
                    {/*    stylingClass="login-registration"*/}
                    {/*    {...register("email")}*/}
                    {/*/>*/}
                    {/*<InputField*/}
                    {/*    type="password"*/}
                    {/*    placeholder="Wachtwoord"*/}
                    {/*    stylingClass="login-registration"*/}
                    {/*    {...register("password")}*/}
                    {/*/>*/}
                    {/*<InputField*/}
                    {/*    type="password"*/}
                    {/*    placeholder="Herhaal wachtwoord"*/}
                    {/*    stylingClass="login-registration"*/}
                    {/*    {...register("password-check")}*/}
                    {/*/>*/}
                    <SubmitButton
                        text="Maak account aan"
                        disabled={submitButton}
                    />
                    {errors["first-name"] && <p className={styles.error}>{errors["first-name"].message}</p>}
                    {errors["last-name"] && <p className={styles.error}>{errors["last-name"].message}</p>}
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    {errors["password-check"] && <p className={styles.error}>{errors["password-check"].message}</p>}
                    {error &&
                        <span className={styles.error}>Oeps, er ging iets verkeerd bij het registreren. Probeer het opnieuw.</span>}
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;