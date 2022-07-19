import React, {useContext, useEffect} from 'react';
import styles from './Login.module.css';
import InputField from '../../components/inputField/InputField'
import SubmitButton from '../../components/submitButton/SubmitButton'
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
// Firebase imports
import {authFirebase} from "../../Firebase";
import {signInWithEmailAndPassword} from "firebase/auth"

function LoginPage({toggleNavdrawer}) {

    // Context management
    const [error, toggleError] = React.useState(false);

    const {register, handleSubmit, reset, formState: {errors}, watch} = useForm();

    // Close navbar after user logout
    useEffect(() => {
        toggleNavdrawer(false);
    }, [])

    async function loginUser(data) {
        toggleError(false);
        try {
            //Log user in and let onAuthStateChange handle the auth state(in Authcontext)
            await signInWithEmailAndPassword(authFirebase, data.email, data.password);
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.h1}>KantineApp</h1>
            <div className={styles["form-card"]}>
                <form className={styles.form} onSubmit={handleSubmit(loginUser)}>
                    <input
                        type="text"
                        placeholder="Email"
                        className={styles["login-registration"]}
                        {...register("email", {
                            required: "Vul uw email in",
                        })}
                    />
                    <input
                        type="password"
                        placeholder="Wachtwoord"
                        className={styles["login-registration"]}
                        {...register("password", {
                            required: "Vul uw wachtwoord in",
                        })}
                    />
                    {/*<InputField*/}
                    {/*    type="text"*/}
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
                    <SubmitButton
                        text="Inloggen"
                    />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    {error && <span className={styles.error}>Er ging iets verkeerd, controleer uw gegevens</span>}
                </form>
                <p className={styles.p}>Nog geen account? Registreer <Link to="/registreren">hier</Link></p>
            </div>
        </main>
    );
}

export default LoginPage;