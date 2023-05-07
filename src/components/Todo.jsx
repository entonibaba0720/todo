import React, { useContext, useState, useRef } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import { Row } from 'react-bootstrap';
import { TodoContext } from '../contexts/TodoContext';
import TodoForm from '../components/Forms/TodoForm';

const Todo = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const { deleteTodo, toggleTodo, updateTodo } = useContext(TodoContext);
  const inputRef = useRef();
  const [newText, setNewText] = useState(todo.text);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleDeleteClick = () => {
    deleteTodo(todo.id);
  };

  const handleToggleClick = () => {
    toggleTodo(todo.id);
  };

  const handleTextChange = e => {
    setNewText(e.target.value);
  };
  const handleSaveClick = () => {
    setEditing(false);

    const updatedTodoItem = { ...todo, text: inputRef.current.value };

    updateTodo(updatedTodoItem);
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

          {editing ? (
            <TodoForm
              initialValue={todo.text}
              variant={'primary'}
              size={'sm'}
              text={'MENTÉS'}
              inputRef={inputRef}
              placeholder={todo.text}
              onChange={handleTextChange}
              onSubmit={handleSaveClick}
              completed={todo.completed}
              className='todo'
            />
          ) : (
            <InputGroup.Text className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </InputGroup.Text>
          )}

          <Button
            text={editing ? 'MENTÉS' : 'SZERKESZTÉS'}
            size={'sm'}
            variant={'secondary'}
            style={{ marginRight: 16, marginLeft: 16 }}
            onClick={editing ? handleSaveClick : handleEditClick}
          />
          <Button
            text={'TÖRLÉS'}
            size={'sm'}
            variant={'danger'}
            onClick={handleDeleteClick}
            className='mr-2'
          />
        </InputGroup>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  .completed {
    text-decoration: line-through;
  }

  .input-group-text:nth-child(2) {
    min-width: 350px;
  }
`;

export default Todo;
