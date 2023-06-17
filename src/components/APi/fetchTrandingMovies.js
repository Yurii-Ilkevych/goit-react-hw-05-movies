import axios from 'axios';

const fetchTrandingMovies = async () => {
const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/all/day',
  params: {language: 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWI4YTU2N2U4NTIwYjJkOTYxNmQyYjU1NGY1MGI4MyIsInN1YiI6IjY0Nzg5MDY0MDc2Y2U4MDEwNzliOGMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ia6cdeIOjpNaTQl8aCiS1rstAtEfICJgybU1GCz5mQ'
  }
};

 const response = await axios.request(options)
    return response.data.results
  }
export default fetchTrandingMovies 