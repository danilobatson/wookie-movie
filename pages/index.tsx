import Head from 'next/head';
import axios from 'axios';
import React, { useEffect, } from 'react';

import { NavBar, Genres } from '../components';
import { useGlobalContext } from '../contexts';

import { config, baseUrl } from '../services';
import { MovieData } from '../components/GenreRows';

export default function Home() {
  const { search, moviesList, setMoviesList } = useGlobalContext();


  // Get all movies from the API
  const getAllMovies = async () => {
    const res = await axios.get(baseUrl, config());

    // If there is a search term, filter the moviesList
    if (search.length > 0) {
      const filteredMovies = res.data.movies.filter((movie: MovieData) => {
        return movie.title.toLowerCase().includes(search.toLowerCase());
      });
      setMoviesList(filteredMovies);
    }
    
    // If there is no search term, set the moviesList to the full list of movies
    else {
      setMoviesList(res.data.movies);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, [search]);

  return (
    <div className='container-fluid'>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NavBar />
      <div className='container pt-3 mt-5'>

        {/* Render the Genres component */}
        <Genres movies={moviesList} />
      </div>
    </div>
  );
}
