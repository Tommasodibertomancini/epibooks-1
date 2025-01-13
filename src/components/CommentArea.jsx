import { Component } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import Loading from './Loading';
import Error from './Error';

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount = () => {
    this.fetchComments();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.asin !== this.props.asin) {
      this.fetchComments();
    }
  };

  fetchComments = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEyNDA3ZGI3MzAwMTU0MDYzYjAiLCJpYXQiOjE3MzY3Nzg0NjUsImV4cCI6MTczNzk4ODA2NX0.r3kLDKA63qCYtNEGvz88POLtNHA99AlVa785vNMDRWA',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('La chiamata non è andata a buon fine');
        }
      })

      .then((arrayComment) => {
        this.setState({
          comments: arrayComment,
          isLoading: false,
          isError: false,
        });
      })

      .catch((err) => {
        console.log(err);
        this.setState({
          isError: false,
        });
      });
  };

  render() {
    return (
      <div className='text-center'>
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
