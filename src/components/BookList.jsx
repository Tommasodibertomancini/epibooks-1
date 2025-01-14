import SingleBook from './SingleBook';
import { Col, Form, Row } from 'react-bootstrap';
import CommentArea from './CommentArea';
import { useState } from 'react';

const BookList = ({ books }) => {
  /* state = {
    searchQuery: "",
    selectedBookAsin: null  
  }; */

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookAsin, setSelectedBookAsin] = useState('');

  const changeSelectedBook = (asin) => {
    setSelectedBookAsin(asin);
  };

  return (
    <>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} md={4} className='text-center'>
          <Form.Group>
            <Form.Control
              type='search'
              placeholder='Cerca un libro'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='g-2 mt-3'>
        <Col>
          <Row>
            {books
              .filter((b) =>
                b.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((b) => (
                <Col xs={12} md={3} key={b.asin}>
                  <SingleBook
                    book={b}
                    changeSelectedBook={changeSelectedBook}
                    selectedBookAsin={selectedBookAsin}
                  />
                </Col>
              ))}
          </Row>
        </Col>

        <Col>{selectedBookAsin && <CommentArea asin={selectedBookAsin} />}</Col>
      </Row>
    </>
  );
};

export default BookList;
