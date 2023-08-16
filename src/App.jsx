// import { useContext, useEffect, useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"
import { db, auth, storage } from './config/firebase'
import {ref, uploadBytes} from "firebase/storage"
import { useState, useEffect } from 'react'

function App() {
  const [movies, setMovies] = useState([])
  const moviesCollectionRef = collection(db, "movie")
// create movie state
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState('')
  const [haveOscar, setHaveOscar] = useState(true)
// update movie state
  const [updatetitle, setUpdatetitle] = useState("")
  // upload file state
  const [uploadFile, setUploadFile] = useState(null)
  const getMovies = async ()=> {
    try{

      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      console.log(filteredData)
      setMovies(filteredData)
    }
    catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    getMovies()

  }, [])

  const submitMovie = async() =>{
    try{
      console.log(auth?.currentUser?.id)
      await addDoc(moviesCollectionRef,{
        title:newMovieTitle,
        dateofrelease:newMovieReleaseDate,
        winoscar:haveOscar,
        userId: auth?.currentUser?.uid || ""
      })
      getMovies()

    }
    catch(err){
      console.error(err)
    }
  }

  const deleteMovie = async(movieId) =>{
    try{
      const documentRef = doc(db,"movie",movieId)
      await  deleteDoc(documentRef)
      getMovies()

    }
    catch(err){
      console.log(err)
    }
  }
  const updateMovie = async(movieId) =>{
    try{
      const documentRef = doc(db,"movie",movieId)
      await  updateDoc(documentRef,{
        title:updatetitle
      })
      getMovies()

    }
    catch(err){
      console.log(err)
    }
  }

  const submitUpload = async () => {
    if(!uploadFile) return;
    const fileRef = ref(storage, `projectfiles/${uploadFile.name}`)
    try{

      await uploadBytes(fileRef, uploadFile)
    }
    catch(err){
      console.error(err)
    }

  }
  

  return (
    <>
     <div>
      hello world
      <Auth/>
      {/* read movies */}
      {
        movies.map((movie) =>(<div key={movie.id}>
           <h1>{movie.title}</h1>
           <p>{movie.dateofrelease}</p>
          <button onClick={() => deleteMovie(movie.id)}>delete movie </button>
          <input type='text' onChange={e => setUpdatetitle(e.target.value)}/>
          <button onClick={() => updateMovie(movie.id)}>update title</button>
           </div>))
      }
      {/* create and update movie */}
      <div>
        <input type="text" placeholder='write the title here...' onChange={e => setNewMovieTitle(e.target.value)} />
        <input type="text" placeholder='write release date here...' onChange={e => setNewMovieReleaseDate(e.target.value)} />
        <input type="checkbox" checked={haveOscar} onChange={e => setHaveOscar(e.target.checked)} />
        <label>Receved an oscar</label>
        <button onClick={submitMovie}>submit movie</button>
      </div>
{/* upload file */}
      <div>
        <input type='file' onChange={(e) => setUploadFile(e.target.files[0])} />
        <button onClick={submitUpload}>upload file</button>
      </div>

     </div>
    </>
  )
}

export default App