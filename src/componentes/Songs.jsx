import { useContext} from 'react'

import { songsContext } from '../context/songsContext'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link } from 'react-router-dom';


export default function Songs(){

   const {filterSongs,setSong,setPoster} = useContext(songsContext)
    
    return(
        <section className='songs overflow-auto p-3'>

              {
              filterSongs.map((song, i) => {
                return (
                
                <div  key={i + song.title}  className='group flex flex-col p-4 rounded-md bg-zinc-900 gap-1 hover:bg-zinc-800'>
                  <Link to={`/album/${song.albumId}`}>
                  <img className='w-full h-auto rounded-md ' src={song.image} alt={song.title}></img>
                  <div className='mt-2'>
                    <strong className='text-white'>{song.title}</strong>
                    <p className='text-zinc-400 py-1'>{song.artists.map((artist) => artist + ' ')}</p>
                  </div>
                  </Link>
                  <div 
                  onClick={()=>{
                  setSong(song);
                  setPoster(true);

                }} className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                      <PlayCircleIcon style={{ color: '#009914', fontSize: 40 }} />
                    </div>
                </div>
                ) }  )  
          
              }
            </section>
            
    )
} 