
import Header from './componentes/header.jsx'
import Search from './componentes/search.jsx'
import './index.css'
import Footer from './componentes/footer.jsx'
import Songs from './componentes/Songs.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './componentes/Home.jsx'
import { ProviderSongsContext } from './context/songsContext.jsx';
import Poster from './componentes/Poster.jsx'
import Album from './componentes/album.jsx'



function App() {

  
  


  return (
    <>
     <ProviderSongsContext>
      <div className='flex flex-col w-full min-h-screen'>
        <div className='flex flex-row h-90p w-full'>

          <Header />

          <Routes>
          
          <Route path='/search' element={
               <aside className='w-full h-full bg-zinc-950 my-4 mx-2 rounded-lg'>
           
               <Search  />
   
               <h3 className=' text-white px-5 p-1 text-2xl' ><strong>Recent searches</strong></h3>
   
            
               <Songs></Songs>

            
             </aside>  }>
          </Route>
          <Route path='/home' element={<Home></Home>}>
              
          </Route>

          <Route path='/album/:id' element={<Album></Album>}>

          </Route>
          </Routes>

          <Poster></Poster>
        </div>
        
        <Footer></Footer>
       
      </div>
      </ProviderSongsContext>
    </>
  );
}
export default App;


