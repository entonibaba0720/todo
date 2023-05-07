import React from 'react';
import CardContent from '../components/CardContent';
import { Col, Row, Container, Card } from 'react-bootstrap';

const LoginPage = () => {
  return (
    <Container>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col lg={4} xs={12}>
          <div className='border border-3 border-primary'></div>
          <Card className='shadow'>
            <Card.Body>
              <CardContent />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
