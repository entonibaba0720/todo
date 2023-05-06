import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from '../components/UI/Button';
import { TodoContext } from '../contexts/TodoContext';

const TodoForm = ({
  variant,
  size,
  text,
  placeholder,
  onSubmit,
  hasButton,
  completed
}) => {
  const [newTodo, setNewTodo] = useState('');
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = event => {
    event.preventDefault();
    const newTodoObject = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };

    addTodo(newTodoObject);
    onSubmit(newTodoObject);
    setNewTodo('');
  };

  const handleChange = event => {
    setNewTodo(event.target.value);
  };

  return (
    <Wrapper>
      <InputGroup>
        <Form.Control
          type='text'
          placeholder={placeholder}
          value={newTodo}
          onChange={handleChange}
          aria-label='input'
          className={completed ? 'input completed' : 'input'}
        />
        {hasButton && (
          <Button
            variant={variant}
            size={size}
            text={text}
            onClick={handleSubmit}
          />
        )}
      </InputGroup>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .input-group {
    display: flex;
    input {
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      margin-right: 1rem;
      border: 1px solid #eee;
      border-radius: 0;
    }
    button {
      padding: 0.375rem 0.75rem;
    }

    .completed {
      text-decoration: line-through;
    }
  }
`;

export default TodoForm;
