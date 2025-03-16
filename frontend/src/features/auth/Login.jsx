import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../services/firebase";

function Login({setUser}) {
    const provider = new GoogleAuthProvider();

    const handleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            setUser(user)
            console.log("User info:", user)
        }).catch((error) => {
            console.error("Login failed: ", error.message)
        })
    }

    return (
        <button onClick={handleLogin}>Sign in with Google</button>
    )
}

export default Login;

