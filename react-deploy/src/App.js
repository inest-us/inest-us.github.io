import { useState, useRef, useEffect } from 'react';
import './App.css';
// import EventBind from './components/EventBind';
// import ParentComponent from './components/ParentComponent';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  /* const [todos, setTodos] = useState([
    {
      id: 1,
      name: 'Learn React',
      completed: false,
    }, 
    {
      id: 2,
      name: 'Learn Redux',
      completed: true,
    }]); */
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();

    useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedTodos) setTodos(storedTodos);
    }, [])

    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos])

    function toggleTodo(id) {
      const newTodos = [...todos];
      const todo = newTodos.find(todo => todo.id === id);
      todo.completed =!todo.completed;
      setTodos(newTodos);
    }

    function handleAddTodo(e) {
      const name =  todoNameRef.current.value;
      if (name === "") return;
      setTodos(prev => {
        return [...prev, {
          id:uuidv4(),
          name: name,
          completed: false
        }]
      });
      todoNameRef.current.value = null;
    }

    function handleClearTodos() {
      const newTodos = todos.filter(todo => !todo.completed);
      setTodos(newTodos);
    }
  return (
    <div className="App">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.completed).length} left to do</div>
    </div>
  );
}

export default App;
