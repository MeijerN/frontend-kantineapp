import React, {useContext} from 'react';
import styles from './Register.module.css';
import SubmitButton from '../../components/submitButton/SubmitButton';
import {useHistory} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {AuthContext} from "../../context/AuthContext";
// Firebase imports
import {authFirebase} from "../../Firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";

function RegisterPage() {

    // State management
    const [submitButtonDisable, toggleSubmitButtonDisable] = React.useState(false);
    const [error, toggleError] = React.useState(false);

    const {register, handleSubmit, reset, formState: {errors}, watch} = useForm();
    const history = useHistory();
    const {createUserInformation} = useContext(AuthContext);

    // React hook forms Watcher for password match check
    const checkPassword = watch('password');

    async function registerUser(data) {
        toggleSubmitButtonDisable(true);
        toggleError(false);
        try {
            const userCredential = await createUserWithEmailAndPassword(authFirebase, data.email, data.password);
            // Send user credentials and input data to Authcontext
            createUserInformation(userCredential, data);
            history.push("/");
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        reset();
        toggleSubmitButtonDisable(false);
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

                    <SubmitButton
                        text="Acount aanmaken"
                        disabled={submitButtonDisable}
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