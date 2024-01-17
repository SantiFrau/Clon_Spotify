import { useContext} from "react"
import { songsContext } from "../context/songsContext"
import CloseIcon from '@mui/icons-material/Close';

export default function Poster(){
    
    

    const {song,poster,setPoster} =useContext(songsContext)
    return (
        <>{ song && poster ?
        <section className="w-1/3 h-full bg-zinc-900 my-4 mx-2 rounded-lg overflow-hidden ">
            <div className="flex flex-row p-3 text-zinc-500 justify-between items-center">
          <p className="text-lg text-white">{song.title}</p>  
           <div onClick={()=>{setPoster(false)}} className="hover:bg-zinc-700 hover:text-white rounded-2xl p-1">
            <CloseIcon style={{fontSize:20}}></CloseIcon>
            </div>
          </div>
          <img className="rounded-lg m-4 w-3/5 m-auto mt-5" src={song.image} alt="" /> 
          <div className="overflow-hidden my-4 mx-6 p-2">
          <p className="font-bold text-white px-4 text-xl overflow-hidden">{song.title}</p>
          <p className=" text-zinc-400 px-4 overflow-hidden">{song.artists.map((a,i)=>{
            if(i>0){return ", "+a} else{ return a}
          })}</p>
          </div>


        </section>
        : undefined
          }
        </>
    )
}