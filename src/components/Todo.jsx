import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from '../components/UI/Button';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { TodoContext } from '../contexts/TodoContext';
import TodoForm from './TodoForm';

const Todo = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const { deleteTodo, toggleTodo } = useContext(TodoContext);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleDeleteClick = () => {
    deleteTodo(todo.id);
  };

  const handleToggleClick = () => {
    toggleTodo(todo.id);
  };

  const handleSaveClick = newText => {
    setEditing(false);
    todo.text = newText;
  };

  return (
    <Container className='mt-4'>
      <Row>
        <InputGroup className='mb-3 justify-content-center'>
          <InputGroup.Checkbox
            aria-label='Checkbox for following text input'
            checked={todo.completed}
            onChange={handleToggleClick}
          />

          <TodoForm
            onSubmit={handleSaveClick}
            initialValue={todo.text}
            variant={'primary'}
            size={'sm'}
            text={'MENTÉS'}
            placeholder={todo.text}
            completed={todo.completed}
          />

          <Button
            text={'SZERKESZTÉS'}
            size={'sm'}
            variant={'secondary'}
            style={{ marginRight: 16, marginLeft: 16 }}
            onClick={handleEditClick}
          />
          <Button
            text={'TÖRLÉS'}
            size={'sm'}
            variant={'danger'}
            onClick={handleDeleteClick}
          />
        </InputGroup>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  .button {
    margin-right: 1rem;
  }
`;

export default Todo;
