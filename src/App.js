import './App.css';
import { useEffect, useState } from 'react';
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';


const API_URL = 'http://www.omdbapi.com/?apikey=65c52660'



function App() {

  const [movies,setMovies] = useState([]);
  const [searchterm,setSearchterm] = useState('');

  const searchMovies = async(title) =>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json()
    setMovies(data.Search);
  }

  
  useEffect(()=>{
    searchMovies('Spiderman')
  },[])
  return (
    <div className="app">
      <h1>MoviesSpot</h1>
      <div className='search'>
        <input placeholder='Search for Movies' onChange={(e)=>setSearchterm(e.target.value)} type='text' value={searchterm}/>
        <img src={SearchIcon} alt='search' onClick={() =>searchMovies(searchterm)}/>
      </div>

      {movies?.length > 0 ?(
        <div className='container'>
          {movies.map((movie)=>(
            <MovieCard movie={movie} key={movie.title} />
          ))}
        </div>
      ):(
         <div className='empty'>
          <h2>No movies Found</h2>
         </div>
      )}
      
    </div>
  );
}

export default App;
