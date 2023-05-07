import React, { useState, useContext } from 'react';
import { Form, Alert } from 'react-bootstrap';
import Button from '../UI/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //validáció
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username.trim()) {
      errors.username = 'Felhasználónév megadása kötelező';
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = 'Jelszó megadása kötelező';
      isValid = false;
    }

    return { errors, isValid };
  };

  //bejelentkezés
  const handleSubmit = e => {
    e.preventDefault();

    const { errors, isValid } = validateForm();
    setIsLoading(true);
    if (username === 'teszt' && password === 'teszt123' && isValid) {
      login({ username, password });
      navigate('/todo');
    } else {
      setIsLoading(false);
      setErrors({
        ...errors,
        message: 'A megadott felhasználónév vagy jelszó nem megfelelő!'
      });
    }
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='username'>
        <Form.Control
          type='text'
          placeholder='Felhasználónév'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {errors.username && (
          <Alert variant='danger' className='mt-3'>
            {errors.username}
          </Alert>
        )}
      </Form.Group>
      <Form.Group className='mb-3' controlId='password'>
        <Form.Control
          type='password'
          placeholder='Jelszó'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && (
          <Alert variant='danger' className='mt-3'>
            {errors.password}
          </Alert>
        )}
      </Form.Group>
      <div className='d-grid'>
        <Button
          variant={'primary'}
          type='submit'
          text={'BEJELENTKEZÉS'}
          size={'md'}
          onClick={handleSubmit}
        />
      </div>
      {errors.message && (
        <Alert variant='danger' className='mt-3'>
          {errors.message}
        </Alert>
      )}
      {isLoading && <Loading />}
    </Form>
  );
};

export default LoginForm;
