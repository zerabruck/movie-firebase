// import React from 'react'
import { useState } from "react"
import {auth, googleProvider} from "../config/firebase"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onSignIn = async() =>{
    console.log(email)
    console.log(password)
    try{
      
      await createUserWithEmailAndPassword(auth, email, password )
    }
    catch(err){
      console.error(err)
    }
    
    // to access the current user you can use this 
    console.log(auth.currentUser.email) 

  }
  const signInWithGoogle = async() =>{
    try{
      
      await signInWithPopup(auth, googleProvider )
    }
    catch(err){
      console.error(err)
    }

  }
  const logout = async() =>{
    try{
      
      await signOut(auth)
    }
    catch(err){
      console.error(err)
    }

  }
  return (
    <div>
      <div>
        <input type="text" placeholder='email' onChange={(e) => {setEmail(e.target.value)}} value={email} />
  
      </div>
      <div>
        <input type="password" placeholder='password' onChange={(e) => {setPassword(e.target.value)}} value={password} />
  
      </div>
      <button onClick={onSignIn}>signin</button>
      <button onClick={signInWithGoogle}>sign in with google</button>
      <button onClick={logout}>logout</button>

    </div>
  )
}

export default Auth