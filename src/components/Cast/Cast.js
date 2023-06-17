import { useState, useEffect } from "react"
import { useParams} from "react-router-dom"
import fetchCredits from "../APi/fetchCredits"
import defaultActor from "./img/no-profile-picture-icon.png"
import { WrapperUl } from "./Cast.styled"

const Cast = () => {

    const [cast, setCast] = useState(null)
    const [statusPending, setStatusPending] = useState(false)
    const {movieId} = useParams()
    const [errorServer, setErrorServer] = useState(false)
    const [notFaund, setNotFound] = useState(false)
useEffect(()=> {
fetchCredits(movieId).then(result => {
    if(result){
        setCast(result.data.cast)
        setStatusPending(true)
    }else if(!result){
        setCast(null)
        setStatusPending(false)
        setErrorServer(true)
    }
if(result.data.cast.length === 0){
    setCast(null)
    setStatusPending(false)
    setNotFound(true)
}
    return ()=> {
        setStatusPending(false)
        setErrorServer(false)  
        setNotFound(false)
    }
})
},[movieId])

const getImg=(actor)=>{
    const {profile_path} = actor
if(profile_path){
return `https://image.tmdb.org/t/p/original/${profile_path}`
}else{return defaultActor}
}
const getName = (actor) => {
    const { original_name, name} = actor
 if(name){
    return name
}else if (original_name){
    return original_name 
}else{ return "No name"}
  }
const getCharacter = (character)=> {
    if(character){
        return character
    }else {return "No character"}
}
    return(
    <section>
      {statusPending && <WrapperUl>
        {cast.map(actor => {
      return<li key={actor.credit_id}>
    <img src={getImg(actor)} alt={getName(actor)} width={80} height={120}></img>
    <h3>{getName(actor)}</h3>
    <p>Character: <span>{getCharacter(actor.character)}</span></p>
    </li>
        })
        }
    </WrapperUl>}
    {errorServer && <h2>Server response error</h2>}
    {notFaund && <h2>No cast information found</h2>}
  </section>)
    }
    
    export default Cast