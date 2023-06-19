import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchRewievs from '../APi/fetchReviews';
import { WrapperUl } from './Rewievs.styled';
import PropTypes from 'prop-types';
const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();
  const [statusPending, setStatusPending] = useState(false);
  const [statusErrorServer, setErrorServer] = useState(false);
  const [statusNotFaund, setNotFound] = useState(false)


  useEffect(() => {
    fetchRewievs(movieId).then(results => {
      if(results && results.length !== 0){
        setReviews(results)
        setStatusPending(true)
    }else if(!results){
        setErrorServer(true)
    }

    if(results.length === 0){
        setNotFound(true)
    }
  })

return ()=> {
    setNotFound(false)
    setStatusPending(false)
    setReviews(null)
    setErrorServer(false)
}

}, [movieId]);

const getAutor = (review)=> {
    const {author} = review
    if(author){
return author
    }else{return "No author"}

}
const getReviews=(review)=> {
const {content} = review

if ( content){
    return content
}else{return "No content"}
}

  return (
    <section>
      {statusPending && <WrapperUl>
        {reviews.map(review => {
         return <li key={review.id}>
          <h3>
            Author: <span>{getAutor(review)}</span>
          </h3>
          <p>{getReviews(review)}</p>
        </li>
        }) }
      </WrapperUl>}
      {statusErrorServer && <h2>Server response error</h2>}
      {statusNotFaund && <h2>We don't have any reviews for this movie</h2>}
    </section>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.string,
};

export default Reviews;
