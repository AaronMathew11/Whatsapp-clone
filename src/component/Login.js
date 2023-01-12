import { Button } from "@mui/material";
import React from "react";
import "../componentcss/Login.css";
import { GoogleAuthProvider } from "firebase/auth";
import app from "../firebase";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Login() {
const [{},dispatch] = useStateValue();

  const provider = new GoogleAuthProvider(app);
  const auth = getAuth(app);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        });
      })
      .catch((error) => alert(error.code));
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://www.freepnglogos.com/uploads/whatsapp-logo-app-png-4.png'
          alt=""
        />
        <div className='login__text'>
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button type='submit' onClick={signIn}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
