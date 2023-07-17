import React, { useState } from 'react';

// Custom Button component
function Button({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="custom-button"
    >
      {children}
    </button>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todoItem = {
        text: newTodo,
        complete: false
      };
      setTodos([todoItem, ...todos]);
      setNewTodo('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].complete = !updatedTodos[index].complete;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const editTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h2>Create Todo List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <Button onClick={addTodo}>Add</Button>

      {todos.map((todo, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={() => toggleComplete(index)}
          />
          {todo.complete ? (
            <del>{todo.text}</del>
          ) : (
            <span>{todo.text}</span>
          )}
          <Button
            disabled={!todo.complete}
            onClick={() => deleteTodo(index)}
          >
            Delete
          </Button>
          {!todo.complete && (
            <>
              <input
                type="text"
                value={todo.text}
                onChange={(e) => editTodo(index, e.target.value)}
              />
              <Button onClick={() => editTodo(index, todo.text)}>
                Save
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
