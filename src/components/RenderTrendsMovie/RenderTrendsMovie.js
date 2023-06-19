import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import { Wrapper, LinkMovie } from "./RenderTrendsMovie.styled";
const RenderTrendsMovie = ({movies}) => {
const location = useLocation()
    return(
        <Wrapper>
           {movies.map(movie => {
            return<li key={movie.id}><LinkMovie to={`movies/${movie.id}`} state={{from: location}}> <h3>{movie.title ?? movie.name}</h3></LinkMovie></li>
           })}
        </Wrapper>
        
    )
    }
    

    RenderTrendsMovie.propTypes = {
        movies: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            name: PropTypes.string,
          })
        ).isRequired,
      };

    export default RenderTrendsMovie