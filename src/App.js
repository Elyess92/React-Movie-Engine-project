import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faPlayCircle,
  faShareFromSquare,
  faCircleDown,
  faThumbsUp,
  faMoon,
  faSun
} from '@fortawesome/free-regular-svg-icons';
import ReactPlayer from 'react-player'


export default function App() {
  const {useState}=React;
  const[theme,setTheme]=useState('light')
  const toggleTheme=()=>{
    setTheme(theme==='light'?'dark':'light')
  }
  return (
    <div className={`${theme==='light'?' light':'dark'}`}>
       <button onClick={toggleTheme} className='darkBtn'> {theme==='light'?(<FontAwesomeIcon icon={faSun}/>):(<FontAwesomeIcon icon={faMoon}/>)}</button>     
      
      <Header />
      <SearchBar />
    </div>
  );
}

//Header component//
const logo =
  'https://o.remove.bg/downloads/d4825c7d-4fe1-4b82-b3c2-d6e3239cb262/movie-icon-27-removebg-preview.png';
const Header = () => {
  return (
    <div className="header">
      <img src={logo} />
      <p>
        React Movie search <span>Engine</span>
      </p>
    </div>
  );
};
//Search bar component//

const SearchBar = () => {
  const { useEffect } = React;
  const { useState } = React;
  const [search, setMovie] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setMovie(e.target.value);
  };
  return (
    <div className="search-container">
      <form>
        <label htmlFor="movie-input">
          <input type="text" value={search} onChange={handleChange} />
        </label>
        <input type="submit" value="Get movie" />
      </form>
      <p>Show a few of our favourite movies</p>
      <Movie movieinput={search} />
    </div>
  );
};
//Movies component//
const Movie = (props) => {
  const { useEffect } = React;
  const { useState } = React;
  const [ReadMore, setReadMore] = useState(false);
  const [movies, setMovies] = useState([]);
  // url for Search for All Movies//
  const url =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
  //url for searching single movies//
  const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
  //searching for All movies//
  const getAllMovies = () => {
    fetch(url)
      .then((response) => response.json())
      .then((moviesdata) => {
        setMovies(moviesdata.results);
      });
  };
  //search for single movies//
  const getMovie = () => {
    fetch(SEARCHAPI + props.movieinput)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results)
      });
  };
  useEffect(() => {
    if (props.movieinput == '') {
      getAllMovies();
    } else {
      getMovie();
    }
  }, [props.movieinput]);
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  return (
    <div className="movie">
      {movies.map((movie) => {
        return (
          <div className="movie-card" key={movie.id}>
            <img src={IMGPATH + movie.poster_path} />
            <h5>{movie.original_title}</h5>
            <span>{movie.vote_average}</span>
            <p>
              {ReadMore
                ? movie.overview
                : `${movie.overview.substring(0, 100)}...`}
              <button onClick={() => setReadMore(!ReadMore)}>
                {ReadMore ? 'show less' : '  read more'}
              </button>
            </p>
            <Rating />
          </div>
        );
      })}
    </div>
  );
};

//Rating component//
const Rating = () => {

  return (
    <div className="rating">
      <button >
        <FontAwesomeIcon icon={faPlayCircle} style={{ color: 'red' }} />
        Watch trailer
      </button>
      <div className="user-interaction">
        <a href="#">
          <FontAwesomeIcon icon={faCircleDown} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faThumbsUp} />
        </a>
      </div>
    </div>
  );
};
