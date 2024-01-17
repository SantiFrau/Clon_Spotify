import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import useSearch from '../hooks/useSearch.jsx';
import debounce from '../hooks/debounce';


export default function Search(){
  
  const {refInput ,buscar} = useSearch()

  return(
    <div className='flex flex-row justify-between p-4'>

          <form onSubmit={(e)=>{e.preventDefault()}} className=' w-full lg:w-96 flex flex-row bg-zinc-800 rounded-3xl p-3 mx-10 focus-within:border order-gray-400 hover:border'>
          <SearchIcon></SearchIcon>  
          <input ref={refInput}  onChange={debounce(buscar,300)} className='text-white bg-transparent w-full outline-none placeholder:text-zinc-500' placeholder='What do you want to listen to' type="text" name="" id="" />
          </form>
           
        
          <div className='text-zinc-400 flex flex-row gap-2'>
            <div className='rounded-full bg-black hover:text-white hover:bg-zinc-950 p-1 w-8 h-8'>
          <NotificationsNoneIcon ></NotificationsNoneIcon>
          </div>
          <div className='rounded-full bg-black hover:text-white hover:bg-zinc-950 p-1 w-8 h-8'>
          <GroupIcon></GroupIcon>
          </div>
          <div className='rounded-full bg-black hover:text-white hover:bg-zinc-950 p-1 w-8 h-8'>
          <PersonIcon></PersonIcon>
          </div>
          
          </div>
          </div>
  )
}