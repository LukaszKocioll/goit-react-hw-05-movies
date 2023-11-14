import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { id } = useParams();
  const [cast, setCast] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [displayType, setDisplayType] = useState(null);
  const [castMessage, setCastMessage] = useState(null);
  const [reviewsMessage, setReviewsMessage] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            language: 'en-US',
            api_key: 'e4a99ef4b720df3722144e1a68094d0e',
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const fetchCast = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: {
          language: 'en-US',
          api_key: 'e4a99ef4b720df3722144e1a68094d0e',
        },
      });
      setCast(response.data.cast);
      setReviews(null);
      setDisplayType('cast');
      setCastMessage(cast && cast.length > 0 ? null : "No cast information available.");
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
        params: {
          language: 'en-US',
          api_key: 'e4a99ef4b720df3722144e1a68094d0e',
        },
      });
      setReviews(response.data.results);
      setCast(null);
      setDisplayType('reviews');
      setReviewsMessage(reviews && reviews.length > 0 ? null : "No reviews available.");
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <div className="container">
      {movieDetails ? (
        <div className="movie-details-container">
          <div className="poster-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={`${movieDetails.title} Poster`}
              className="poster-image"
            />
          </div>
          <div className="details-container">
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.overview}</p>
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Genre: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
            <p>User Score: {movieDetails.vote_average}</p>
            <button onClick={fetchCast}>Cast</button>
            <button onClick={fetchReviews}>Reviews</button>

            {displayType === 'cast' && cast && cast.length > 0 && (
              <div>
                <h3>Cast</h3>
                <ul>
                  {cast.map((actor) => (
                    <li key={actor.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                        alt={`${actor.name} Profile`}
                      />
                      <span>{actor.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {displayType === 'reviews' && reviews && reviews.length > 0 && (
              <div>
                <h3>Reviews</h3>
                <ul>
                  {reviews.map((review) => (
                    <li key={review.id}>
                      <p>{review.author}</p>
                      <p>{review.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {castMessage && <p>{castMessage}</p>}
            {reviewsMessage && <p>{reviewsMessage}</p>}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
