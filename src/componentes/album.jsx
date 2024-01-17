import { useParams } from "react-router-dom"
import {playlists, songs} from "../data/songs"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useContext } from "react";
import { songsContext } from "../context/songsContext";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
export default function Album () {
   
    const params = useParams()
    
    const album = playlists.filter((d)=>d.albumId==params.id)[0]
    
    const albumSongs = songs.filter((d)=>{
        return d.albumId==params.id
    })
    
    const {setSong} = useContext(songsContext)
     console.log(album.color)
   return (
       
       <section className="w-full h-full bg-zinc-900 my-4 mx-2 rounded-lg overflow-auto ">
        <div className={`flex flex-row items-center py-7 p-3 gap-3 ${album.color}`}>
               <img className="w-44 rounded-md" src={album.cover} alt="" />
               <div className="flex flex-col">
               <h1 className="text-white text-xl font-bold">{album.title}</h1>
               <p className="text-zinc-200">{album.artists.map((a,i)=>{
               if(i>0){return " | "+a}else{return a}
               })}</p>
               </div>
        </div>
        <div className=" w-40 px-3 py-2 transform scale-100 hover:scale-110 transition-transform" onClick={()=>{setSong(albumSongs[0])}}>
           <PlayCircleIcon style={{color:"#009914" , fontSize:60}}></PlayCircleIcon>
        </div>

        <div className="text-zinc-400 flex flex-row w-full p-4  ">
            <p className="w-10">#</p><p className="w-4/6">Title</p><p className="w-2/6 flex justify-end px-4"><AccessTimeIcon></AccessTimeIcon></p>
        </div>
           
           {
            albumSongs.map((d)=>{
             return( <div key={d.title} className="group flex flex-row w-full p-3 mx-1 gap-3 items-center hover:bg-zinc-800 rounded-md "
                   onClick={()=>{setSong(d)}}>
                   <p className="text-white group-hover:inline hidden"> <PlayArrowIcon></PlayArrowIcon></p>
                   <p className="group-hover:hidden w-10 text-zinc-400 px-2">{d.id}</p>
                   <div className="w-full">
                    <p className="text-white">{d.title}</p>
                     <p className="text-zinc-400">{d.artists.map((d,i)=>{
                        if(i>0){return ", "+d } else{return d}
                    })}</p>
                   </div>
                   <p className="text-zinc-400 px-5">{d.duration}</p>
               </div>)
            })
           }


       </section>
    )
}