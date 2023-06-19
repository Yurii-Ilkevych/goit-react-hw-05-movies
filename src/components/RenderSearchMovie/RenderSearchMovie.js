import { useLocation } from "react-router-dom";
import { Wrapper, LinkMovie } from "./RenderSearchMovie.styled";
import PropTypes from 'prop-types';
const RenderSearchMovie = ({movies}) => {
const location = useLocation()
    return(
        <Wrapper>
           {movies.map(movie => {
            return<li key={movie.id}><LinkMovie to={`${movie.id}`} state={{from: location}}> <h3>{movie.title ?? movie.name}</h3></LinkMovie></li>
           })}
        </Wrapper>
        
    )
    }
    
    RenderSearchMovie.propTypes = {
        movies: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            name: PropTypes.string,
          })
        ).isRequired,
      };


    export default RenderSearchMovie