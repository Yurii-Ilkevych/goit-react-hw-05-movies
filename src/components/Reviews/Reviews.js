import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchRewievs from '../../api/fetchReviews';
import { WrapperUl } from './Rewievs.styled';

const Reviews = () => {

  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();
  const [statusPending, setStatusPending] = useState(false);
  const [statusErrorServer, setStatusErrorServer] = useState(false);
  const [statusNotFaund, setStatusNotFound] = useState(false);

  useEffect(() => {
    fetchRewievs(movieId).then(results => {
      if (results && results.length !== 0) {
        setReviews(results);
        setStatusPending(true);
      } else if (!results) {
        setStatusErrorServer(true);
      }

      if (results.length === 0) {
        setStatusNotFound(true);
      }
    });

    return () => {
      setStatusNotFound(false);
      setStatusPending(false);
      setReviews(null);
      setStatusErrorServer(false);
    };
  }, [movieId]);

  const getAutor = review => {
    const { author } = review;
    if (author) {
      return author;
    } else {
      return 'No author';
    }
  };
  const getReviews = review => {
    const { content } = review;

    if (content) {
      return content;
    } else {
      return 'No content';
    }
  };

  return (
    <section>
      {statusPending && (
        <WrapperUl>
          {reviews.map(review => {
            return (
              <li key={review.id}>
                <h3>
                  Author: <span>{getAutor(review)}</span>
                </h3>
                <p>{getReviews(review)}</p>
              </li>
            );
          })}
        </WrapperUl>
      )}
      {statusErrorServer && <h2>Server response error</h2>}
      {statusNotFaund && <h2>We don't have any reviews for this movie</h2>}
    </section>
  );
};

export default Reviews;
