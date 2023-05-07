import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from '../../components/UI/Button';
import { TodoContext } from '../../contexts/TodoContext';

const TodoForm = ({
  variant,
  size,
  text,
  placeholder,
  onSubmit,
  hasButton,
  initialValue,
  inputRef
}) => {
  // Az új todo és az addTodo függvény állapotának beállítása a TodoContext segítségével
  const [newTodo, setNewTodo] = useState(initialValue || '');
  const { addTodo } = useContext(TodoContext);

  // Az új todo hozzáadása az adatokhoz és az űrlap resetelése
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

  // Az új todo állapotának frissítése az input mező értéke alapján
  const handleChange = event => {
    setNewTodo(event.target.value);
  };

  // Az új todo kezdőértékének beállítása, ha initialValue megváltozik
  useEffect(() => {
    setNewTodo(initialValue || '');
  }, [initialValue]);

  return (
    <Wrapper>
      <InputGroup className='d-flex'>
        <Form.Control
          type='text'
          placeholder={placeholder}
          onChange={handleChange}
          aria-label='input'
          value={newTodo}
          ref={inputRef}
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
    input {
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      margin-right: 1rem;
      border: 1px solid #eee;
      border-radius: 0;
      min-width: 350px;
    }

    button {
      padding: 0.375rem 0.75rem;
    }
  }
`;

export default TodoForm;
