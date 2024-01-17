import { createContext } from "react";
import { useState } from "react";
import { songs } from "../data/songs";

export const songsContext = createContext()

export const ProviderSongsContext =({children})=>{

    const [filterSongs,setFilterSongs]= useState(songs)
    const [song , setSong] = useState(undefined)
    const [poster,setPoster] = useState(true)

   const next=()=>{
      const id = parseInt(song.id) + 1

  const newSong =  songs.filter((d)=>{
        return d.id == id && d.albumId ==song.albumId
    })[0]

    setSong (newSong)
   }

   const prev = ()=>{

    if(song.id=="1"){return }
    const id = parseInt(song.id) - 1

  const newSong =  songs.filter((d)=>{
        return d.id == id && d.albumId ==song.albumId
    })[0]
    setSong (newSong)
   }

 return (
    <songsContext.Provider value={
        {
          filterSongs,
          setFilterSongs,
          song,
          setSong,
          poster,
          setPoster,
          next,
          prev,
        }
    }>
        {children}
    </songsContext.Provider>
 )
}