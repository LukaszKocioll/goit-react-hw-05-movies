import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            language: 'en-US',
            api_key: 'e4a99ef4b720df3722144e1a68094d0e',
          },
        });
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="movies-container">
      <h2>Popular Movies</h2>
      <ul>
        {popularMovies.map((movie) => (
          <li key={movie.id}>
            <p>{movie.title}</p>
            <img
              src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <Link to={`/movies/${movie.id}`} className="details-button">
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Home;
