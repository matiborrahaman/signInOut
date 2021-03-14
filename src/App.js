import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fire-config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);


function App() {
const [user, setUser]= useState({
  isSignedIn: false,
  name:'',
  email: '',
  photo: ''

})
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL}=res.user;
      const singnedInUser ={
        isSignedIn:true,
        name: displayName,
        email:email,
        photo: photoURL,
      }
      setUser(singnedInUser);
      console.log(displayName, email, photoURL);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
  }
const handleSignOut = () =>{
  firebase.auth().signOut()
  .then(res =>{
    const signedOutUser ={
      isSignedIn: false,
      name:'',
      photo:'',
      email:''
    }
  setUser(signedOutUser);   
  })
  .catch(err => {
    
  })
}

  return (
    <div className="App">
      {
        user.isSignedIn ? <button className="btnStyle" onClick={handleSignOut}>Sign out</button> :
         <button className="btnStyle" onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && 
        <div>
            <p>Welcome,{user.name}</p>
            <p>Your email:{user.email}</p>
            <img src={user.photo} alt=""/>
        </div>
        
      }
    </div>
  );
}

export default App;
