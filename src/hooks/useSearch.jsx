import { useContext, useRef} from 'react'
import { songs } from '../data/songs'
import { songsContext } from '../context/songsContext'

export default function useSearch(){
   
    const {setFilterSongs} = useContext(songsContext)
    const refInput = useRef()

    
   const buscar = () =>{


     
  const newSongs =songs.filter((song)=>{
    
    return song.title.toLowerCase().startsWith(refInput.current.value.toLowerCase());
   })
   setFilterSongs( newSongs);
   
   }



    return {refInput,buscar}
}



