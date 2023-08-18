// import React from 'react'
import { useState } from "react"
import {auth, googleProvider} from "../config/firebase"
import {createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth"
function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // sign in 
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const onSignUp = async() =>{
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
  const onSignIn = async() =>{
    signInWithEmailAndPassword(auth, signInEmail, signInPassword).then((userCredentials) =>{
      const user = userCredentials.user.uid
      console.log(user)
    }).catch((err)=>{
      console.error(err)
    })

  }
  return (
    <div>
      <div>
        <input type="text" placeholder='email' onChange={(e) => {setEmail(e.target.value)}} value={email} />
  
      </div>
      <div>
        <input type="password" placeholder='password' onChange={(e) => {setPassword(e.target.value)}} value={password} />
  
      </div>
      <button onClick={onSignUp}>signin</button>
      <button onClick={signInWithGoogle}>sign in with google</button>
      <button onClick={logout}>logout</button>

      <div>

      <div>
        <input type="text" placeholder='email for sign in' onChange={(e) => {setSignInEmail(e.target.value)}}  />
  
      </div>
      <div>
        <input type="password" placeholder='password for sign in' onChange={(e) => {setSignInPassword(e.target.value)}} />
  
      </div>
      <button onClick={onSignIn}>sign in</button>
        
      </div>

    </div>
  )
}

export default Auth