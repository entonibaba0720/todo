import React, { useState, createContext, useEffect } from 'react';

// Létrehozzuk a contextet, amelynek alapértelmezett értéke üres tömb
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  // Új todo hozzáadása
  const addTodo = newTodo => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Todo törlése az ID alapján
  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
    // Mentjük az adatokat localStorage-ba
    localStorage.setItem(
      'todos',
      JSON.stringify(todos.filter(todo => todo.id !== id))
    );
  };

  // Todo állapotának megfordítása az ID alapján
  const toggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    // Mentjük az adatokat localStorage-ba
    localStorage.setItem(
      'todos',
      JSON.stringify(
        todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };

  // Todo frissítése
  const updateTodo = updatedTodo => {
    const { id, text, completed } = updatedTodo;
    // Mentjük az adatokat localStorage-ba
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, text, completed } : todo))
    );

    // Betöltjük a localStorage-ban tárolt todokat
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    localStorage.setItem(
      'todos',
      JSON.stringify(
        storedTodos.map(todo =>
          todo.id === id ? { ...todo, text, completed } : todo
        )
      )
    );
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    // A context provider segítségével elérhetővé tesszük a todokat és az összes függvényt a leszármazott komponensek számára
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
