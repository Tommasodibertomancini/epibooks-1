import CommentList from './CommentList';
import AddComment from './AddComment';
import Loading from './Loading';
import Error from './Error';
import { useEffect, useState } from 'react';

const CommentArea = ({ asin }) => {
  /* state = {
    comments: [],
    isLoading: true,
    isError: false,
  }; */

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [changeValue, setChangeValue] = useState(true);

  const changeValueFunction = () => {
    setChangeValue(!changeValue);
  };

  useEffect(() => {
    fetchComments();
  }, [asin]);

  useEffect(() => {
    fetchComments();
  }, [changeValue]);

  const fetchComments = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzY3Nzg0NjUsImV4cCI6MTczNzk4ODA2NX0.r3kLDKA63qCYtNEGvz88POLtNHA99AlVa785vNMDRWA',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('La chiamata non è andata a buon fine');
        }
      })

      .then((arrayComment) => {
        setComments(arrayComment);
        setIsLoading(false);
        setIsError(false);
      })

      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  };

  return (
    <div className='text-center'>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} changeValueFunction={changeValueFunction} />
      <CommentList
        commentsToShow={comments}
        changeValueFunction={changeValueFunction}
      />
    </div>
  );
};

export default CommentArea;
