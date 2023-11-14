import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Movies.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          query: searchQuery,
          language: 'en-US',
          api_key: 'e4a99ef4b720df3722144e1a68094d0e',
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="movies-container">
      <h2>Movies</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map((movie) => (
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



export default Movies;
