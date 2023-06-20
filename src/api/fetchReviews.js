import axios from 'axios';

const fetchRewievs = async id => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWI4YTU2N2U4NTIwYjJkOTYxNmQyYjU1NGY1MGI4MyIsInN1YiI6IjY0Nzg5MDY0MDc2Y2U4MDEwNzliOGMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ia6cdeIOjpNaTQl8aCiS1rstAtEfICJgybU1GCz5mQ',
    },
  };
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`,
      options
    );
    return response.data.results;
  } catch (error) {
    return error;
  }
};

export default fetchRewievs;
