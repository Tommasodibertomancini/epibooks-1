import { Button, ListGroup } from 'react-bootstrap';

const SingleComment = ({ comment }) => {
  const deleteComment = async (asin) => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + asin,
        {
          method: 'DELETE',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzY3Nzg0NjUsImV4cCI6MTczNzk4ODA2NX0.r3kLDKA63qCYtNEGvz88POLtNHA99AlVa785vNMDRWA',
          },
        }
      );
      if (response.ok) {
        alert('La recensione è stata elimata!');
      } else {
        throw new Error('La recensione non è stata eliminata!');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ListGroup.Item>
      {comment.comment}
      <Button
        variant='danger'
        className='ms-2'
        onClick={() => deleteComment(comment._id)}
      >
        Elimina
      </Button>
    </ListGroup.Item>
  );
};

export default SingleComment;
