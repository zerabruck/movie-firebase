import { useEffect, useState } from "react"
import { storage } from "../config/firebase"
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"

function ImageUpload() {
    const [imageUpload, setImageUpload] = useState(null)
    const [imageList,setImageList] = useState([])
    const imagesRef = ref(storage,"images/")
    useEffect(()=>{
        listAll(imagesRef).then(res =>{
            console.log("hi")
            console.log(res)
            res.items.forEach((item) =>{
                getDownloadURL(item).then(url =>{
                    console.log("hellow")
                    setImageList((prev) => [...prev, url])
                    console.log(imageList)
                })

            })
        })


    },[])
    const submitImage = () =>{
        if (!imageUpload) return 
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) =>{
            getDownloadURL(snapshot.ref).then(url =>{
                setImageList((prev) => [...prev,url] )
            })
            alert("image uploaded")
        }).catch(err =>{
            console.error(err)
        })


    }

  return (
    <div>
        <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
        <button onClick={submitImage}>submit image</button>
        {
            imageList.map((url) =>{
                return (<div key={url}>
                    <img src={url} />

                </div>)
            })
        }
        </div>
  )
}

export default ImageUpload