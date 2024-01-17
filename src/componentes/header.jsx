import SearchIcon from '@mui/icons-material/Search';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddIcon from '@mui/icons-material/Add';
import {playlists} from "../data/songs.js"
import {NavLink } from 'react-router-dom';
import HomeIcon from '../icons/homeicon.jsx';
import { useState } from 'react';




export default function Header(){

    const [menu,setMenu] = useState(true)

    return (
      <>

      {  menu ? 

     <header className='flex flex-col h-full md:w-5/12 w-auto'>
        <nav className='flex flex-col gap-3 bg-zinc-900 my-4 mx-3 rounded-lg '>
        <ul className='p-5 flex flex-col'>
          <NavLink to="/home" className={({isActive})=>{ return isActive ? "isActive" : undefined }}>
            <li className='cursor-pointer flex flex-row gap-3 p-2 hover:text-white text-zinc-400'> <HomeIcon ></HomeIcon><strong>Home</strong> </li>
          </NavLink>
          <NavLink to="/search" className={({isActive})=>{ return isActive ? "isActive" : undefined }}>
          <li className=' cursor-pointer flex flex-row gap-3 p-2 hover:text-white text-zinc-400'> <SearchIcon ></SearchIcon> <strong>Search</strong></li>
          </NavLink>
        </ul>
      </nav>
      <div className='flex flex-col gap-1 bg-zinc-900 mx-3 rounded-lg overflow-hidden'>

        <h3 className='flex flex-row justify-between p-3 ' > 
        <div className=' cursor-pointer hover:text-white text-zinc-400' onClick={()=>setMenu(false)}>
        <LibraryAddIcon></LibraryAddIcon> 
        <strong className='m-3'>Your Library</strong> 
        </div>
        <AddIcon className='hover:text-white text-zinc-400'></AddIcon>
        </h3>

        <section className='overflow-auto px-3'>
          {
            playlists.map((playlist,i)=>{
            
                return (
                  <NavLink 
                  key={playlist.title+i}
                  className={({isActive})=>{return isActive ? "isActive" : undefined}}
                  to={`/album/${playlist.albumId}`}>
                  
                    <div className='cursor-pointer flex flex-row hover:bg-zinc-800'>
                        <img className='w-16 rounded-md m-3' src={playlist.cover} alt="" />
                        <div className='flex flex-col items-start justify-center px-3 truncate'>
                         <strong className='text-white'>{playlist.title}</strong>
                         <p className='text-zinc-400'>{playlist.artists.map((artista,i)=>{
                
                                if(i>0){return " ," + artista} else{ return artista}
                            
                         })}</p>
                        </div>
                    </div>
                    </NavLink>
                )
            })
          }

        </section>

      </div>
      </header>

         :

         <header  className='flex flex-col h-full w-24 items-center mx-0'>

            <nav className='flex flex-col gap-3 bg-zinc-900 my-4 m-1 rounded-lg w-11/12 justify-center items-center '>
                <ul className='p-2 flex flex-col'>
                   <NavLink to="/home" className={({isActive})=>{ return isActive ? "isActive" : undefined }}>
                   <li className='flex flex-row gap-3 p-2 hover:text-white text-zinc-400'> <HomeIcon ></HomeIcon> </li>
                   </NavLink>
                   <NavLink to="/search" className={({isActive})=>{ return isActive ? "isActive" : undefined }}>
                   <li className='flex flex-row gap-3 p-2 hover:text-white text-zinc-400'> <SearchIcon ></SearchIcon></li>
                   </NavLink>
                </ul>
           </nav>
           <div className=' justify-center items-center w-11/12 flex flex-col gap-1 bg-zinc-900 my-1 mx-3 rounded-lg  bg-zinc-900  rounded-lg overflow-hidden'>
             <div className='hover:text-white text-zinc-400 flex flex-row justify-center p-3' onClick={()=>setMenu(true)}>
              <LibraryAddIcon></LibraryAddIcon> 
             </div>


              <section className='overflow-x-auto'>
          {
            playlists.map((playlist,i)=>{
                return (
                    <div key={i} className='flex flex-row hover:bg-zinc-800'>
                        <img className='w-10 rounded-md my-2 m-1' src={playlist.cover} alt="" />
                
                    </div>
                )
            })
          }

        </section>
       
           </div>



         </header>

        }
      </>
        
    )
}