import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Error = () => {
  return (
    <Container fluid>
      <Row className='error'>
        <Col lg={6} className='my-auto'>
          <h1>A keresett oldal nem található</h1>
          <Button href='/' className='text-white'>
            Kezdőlap
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.main`
  .error {
    display: flex;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    justify-content: center;
  }
`;

export default Error;
