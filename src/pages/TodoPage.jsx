import React, { useContext, useState, useEffect } from 'react';
import { Header, TodoForm, Button, Todo } from '../components';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from '../contexts/AuthContext';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { addTodo, todos } = useContext(TodoContext);
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = newTodo => {
    const newTodoObject = {
      id: Date.now(),
      text: newTodo.text,
      completed: false
    };
    console.log(newTodo);
    addTodo(newTodoObject);

    setTodoText('');
  };

  const handleInputChange = e => {
    setTodoText(e.target.value);
  };
  return (
    <>
      <Navbar bg='dark' className='justify-content-end pe-4'>
        <Button
          text={'KIJELENTKEZÉS'}
          size={'sm'}
          onClick={handleLogout}
          variant={'outline-light'}
        />
      </Navbar>
      <Wrapper>
        <Container fluid className='mt-5' lg={6}>
          <Row className='justify-content-center'>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row className='justify-content-center' lg={2}>
            <Col>
              <TodoForm
                variant={'primary'}
                size={'sm'}
                text={'Hozzáadás'}
                onSubmit={handleSubmit}
                value={todoText}
                onChange={handleInputChange}
                placeholder={'Új teendő hozzáadása'}
                hasButton={true}
              />
            </Col>
          </Row>
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default TodoPage;
