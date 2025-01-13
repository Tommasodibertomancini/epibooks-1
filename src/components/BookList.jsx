import { Component } from 'react';
import SingleBook from './SingleBook';
import { Col, Form, Row } from 'react-bootstrap';
import CommentArea from './CommentArea';

class BookList extends Component {
  state = {
    searchQuery: '',
    selectedBookAsin: null,
  };

  changeSelectedBook = (asin) => {
    this.setState({
      selectedBookAsin: asin,
    });
  };

  render() {
    return (
      <>
        <Row className='justify-content-center mt-5'>
          <Col xs={12} md={4} className='text-center'>
            <Form.Group>
              <Form.Control
                type='search'
                placeholder='Cerca un libro'
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='g-2 mt-3'>
          <Col>
            <Row>
              {this.props.books
                .filter((b) =>
                  b.title
                    .toLowerCase()
                    .includes(this.state.searchQuery.toLowerCase())
                )
                .map((b) => (
                  <Col className='list' xs={12} md={3} key={b.asin}>
                    <SingleBook
                      book={b}
                      selected={this.state.selectedBookAsin === b.asin}
                      changeSelectedBook={() => this.changeSelectedBook(b.asin)}
                    />
                  </Col>
                ))}
            </Row>
          </Col>

          <Col>
            {this.state.selectedBookAsin && (
              <CommentArea asin={this.state.selectedBookAsin} />
            )}
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
