import { useEffect, useContext } from "react";
import Router from "next/router";
import firebase from "../utils/firebase";
import { AuthContext } from "./Auth";
import firebaseUtil from "../utils/firebase";

const SignInButton = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    currentUser && Router.push("/");
  }, [currentUser]);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };
  const signout = () => {
    firebaseUtil.auth().signOut();
  };

  if (currentUser) {
    return (
      <button className="btn btn-primary" onClick={signout}>
        {currentUser.displayName} (Click to Sign out)
      </button>
    );
  }

  return (
    <button className="btn btn-primary" onClick={login}>
      Sign in with Google
    </button>
  );
};

export default SignInButton;
