import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { useContext, useEffect, useState } from 'react';
import { songsContext } from '../context/songsContext';
import { useRef } from 'react';




export default function Footer(){
    
  //cuando un elmento del dom no se actualiza pero el estado que usa si se puede usar un use ref para modificar
  //es elemento como un elemto audio modificar la src junto a un useefect

  //en las fuentes si son archivos locales hay que fijarce la direccion desde el index.html no desde el archivo 
  //que estemos porque cuando se rederiza va al index
  
  
    //cancion a reproducir
  const {song,next,prev} = useContext(songsContext)
  
  const [audioSrc, setAudioSrc] = useState('');
  const audioRef = useRef(new Audio());
  //tiempo que se va reproduciendo el tema
  const [time,setTime] = useState(0)
  //estado para saber volumen
  const [volumen,setVolumen] = useState(0.1)


  const [isMute,setMute] = useState(false)
   const prevVol = useRef(0)


   

  //inicializando vol (localstorage mas adelante)

  useEffect(()=>{
    audioRef.current.volume=0.1
  },[])

 

  //cambia el estado de la src del audio
  useEffect(() => {
    if (song) {
      setAudioSrc(`/public/music/${song.albumId}/0${song.id}.mp3`);
      console.log(audioSrc)
    } else {
      setAudioSrc('');
    }
  }, [song]);



 //modifica la fuente del audio cuando cambia la fuente
  useEffect(() => {

    audioRef.current.src = audioSrc;
    // Se inicia la reproducción si el audio está en pausa y se cambia la src
    if (audioRef.current.paused && audioSrc) {
      audioRef.current.play();
    }

    // Manejador para el evento timeupdate
    const TimeUpdate = () => {
      //agregando el nuevo tiempo cuandono se este moviendo
      
        setTime(audioRef.current.currentTime);
      
    };

    // Agrega el evento timeupdate al elemento audio cuando actualiza el timepo del audio se ejecuta
    audioRef.current.addEventListener('timeupdate',TimeUpdate);




    //saber si termino el tema y poner el siguiente
    
     

    audioRef.current.addEventListener("ended",next)




    // Limpia el evento al desmontar el componente
    return () => {
      audioRef.current.removeEventListener('timeupdate',TimeUpdate),
      audioRef.current.removeEventListener("ended",next)
      
    };
  }, [audioSrc]);


  const reproducir = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  





  const modificar = (e) => {
    //seteando el nuevo tiempo en caso de que se modificque el range
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setTime(newTime);
  };
   //el rangue se mueve solo porque su value es time que time va cambiando segun el currentTime


   //volumen

   const CambiarVolumen =(e)=>{
       const newVol = e.target.value
       audioRef.current.volume=newVol
       setVolumen(newVol)
   }

   
  //mute

   const mute = ()=>{
    if(isMute) {
     prevVol.current=audioRef.current.volume
    audioRef.current.volume=0 
    setVolumen(0)
    setMute(false)
    } else{
    audioRef.current.volume=prevVol.current
    setVolumen(prevVol.current)
    setMute(true)
   } }

//cuando pasa los 2min el tema el rango se rompe

//range maximo es de 1.40 min nomas
const duracionTotal = song?.duration || "0:00";
const [minutos, segundos] = duracionTotal.split(":");
const duracionTotalEnSegundos = parseInt(minutos) * 60 + parseInt(segundos);

    return(
        <footer className="w-full footer bg-black flex flex-row justify-around">
          { song ? 
          
          <div className='flex flex-row footer w-1/3 truncate'>
                        <img className='w-18 rounded-md m-3' src={song?.image} alt="" />
                        <div className='flex flex-col items-start justify-center px-3'>
                         <strong className='text-white'>{song?.title}</strong>
                         <p className='text-zinc-400'>{song.artists.map((a,i)=>{
                             if(i>0){return ", "+a} else{ return a}})}
                          </p>
                        </div>
                    </div>
           : <div className='flex flex-row footer w-1/3'></div>
          }
          <div className='flex flex-col w-1/3'>
          <div className='text-white flex items-center gap-1 justify-center p-1'>

          <audio ref={audioRef} id="audioPlayer" className='hidden'>
            <source src={audioSrc} type="audio/mp3"/> 
      
          </audio>
            <div onClick={prev}>
           <SkipPreviousIcon className='hover:text-gray-400' style={{ fontSize: 38 }}></SkipPreviousIcon>
           </div>
           <div onClick={()=>{reproducir()}}>
           <PlayCircleIcon className='hover:text-gray-400' style={{ fontSize: 41 }}></PlayCircleIcon>
           </div>
           <div onClick={next}>
           <SkipNextIcon className='hover:text-gray-400' style={{ fontSize: 38 }}></SkipNextIcon>
           </div>
          </div>

             <div className='flex flex-row w-full items-center'>
                <p className='text-zinc-400 text-sm text-center px-2'>{formatTime(time)}</p>
                <div className='w-11/12 h-1 rounded-md flex items-center'>
                  <input className='w-full'
                    type="range"
                    min={0}
                    max={duracionTotalEnSegundos}
                    value={time}
                    onChange={modificar}
                    
                  />

                </div>
                <p className='text-zinc-400 text-sm text-center px-2'>{song?.duration}</p>
              
          </div>
          </div>

          <div className='hidden md:flex md:w-1/3 w-1/4 text-gray-500 flex-row gap-2 justify-end items-center p-3'>
            <MicExternalOnIcon className='hover:text-gray-300' style={{ fontSize: 24 }}></MicExternalOnIcon>
            <div onClick={()=>{mute()}}>
            <VolumeDownIcon className='hover:text-gray-300' style={{ fontSize: 24 }}></VolumeDownIcon>
            </div>
           
            <form action="#">
              <input type="range" className='mt-1' style={{ backgroundColor: "#d1d5db", color: "#ffffff" }} 
              min={0} 
              max={1} 
              step={0.01}
              value={volumen}
              onChange={CambiarVolumen} />
            </form>
            <FullscreenExitIcon className='hover:text-gray-300' style={{ fontSize: 24 }}></FullscreenExitIcon>
            
          </div>

        </footer>
    )
}