import { useContext } from "react";
import { fav, post } from "../data/songs"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { songsContext } from "../context/songsContext";

export default function Home(){

  const {setSong,setPoster} = useContext(songsContext)

    return(
        <aside className='w-full h-full bg-zinc-900 my-4 mx-2 rounded-lg overflow-auto'>

           <div className="w-10/12 h-2/5 p-5 m-3 flex flex-row bg-gradient-to-r from-black to-zinc-900 overflow-hidden">
            <img src={post.image} alt="" />
            <div className="overflow-hidden">
                <p className="font-bold text-white p-3 text-2xl">{post.title}</p>
                
                <p className="text-zinc-500 p-3">{post.artists.map((a)=>a+" | ")}</p>
            </div>
                
           </div>
           
           <h3 className="text-white px-6 p-2 text-xl"> <strong>Good evening</strong></h3>

        <section className='grid  grid-cols-2 p-3 '>

        

        
              {
              fav.map((song, i) => {
                return (

                    <div onClick={()=>{
                      setSong(song)
                      setPoster(true)
                    }} 
                    key={i + song.title} 
                    className='cursor-pointer group flex justify-between flex-row m-1 rounded-md bg-zinc-800 gap-3 hover:bg-zinc-700 items-center'>
                    <img className='w-14 h-auto rounded-md ' src={song.image} alt={song.title} />
                    <div className="w-full">
                      <strong className='text-white'>{song.title}</strong>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircleIcon style={{ color: '#009914', fontSize: 40 }} />
                    </div>
                  </div>
              ) }  )  
              
              }
            </section>
            </aside>
    )
}