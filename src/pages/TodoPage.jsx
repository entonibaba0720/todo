import React, { useContext, useState, useEffect } from 'react';
import { Header, Todo, Search } from '../components';
import Button from '../components/UI/Button';
import TodoForm from '../components/Forms/TodoForm';
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
  const { addTodo, todos } = useContext(TodoContext);
  const [todoText, setTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  //kijelentkezés
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
    addTodo(newTodoObject);

    setTodoText('');
  };

  // Input változás kezelése
  const handleInputChange = e => {
    setTodoText(e.target.value);
  };
  const handleSearch = value => {
    setSearchTerm(value);
  };

  //keresés
  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                placeholder={'Új teendő hozzáadása'}
                hasButton={true}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className='mt-3 justify-content-center' lg={3}>
            {todos.length > 0 && (
              <Row>
                <Search value={searchTerm} onChange={handleSearch} />
              </Row>
            )}
          </Row>

          {filteredTodos.length > 0
            ? filteredTodos.map(todo => <Todo key={todo.id} todo={todo} />)
            : searchTerm === '' && (
                <Row className='justify-content-center'>
                  <p className='text-white'>Nincsenek teendők</p>
                </Row>
              )}
          {filteredTodos.length === 0 && searchTerm !== '' && (
            <Row className='justify-content-center'>
              <p className='text-white'>Nincs találat</p>
            </Row>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default TodoPage;
