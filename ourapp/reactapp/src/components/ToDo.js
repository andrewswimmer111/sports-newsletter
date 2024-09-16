import { useState } from "react";
import "./ToDo.css";

function TodoList() {
  // State variables to store the list of todos and the input value
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (input) {
      // Create a new todo object and add it to the todos array
      setTodos([...todos, { text: input, isCompleted: false }]);
      // Clear the input field
      setInput("");
    }
  };

  // Function to handle marking a todo as complete or incomplete
  const handleComplete = (index) => {
    // Create a copy of the todos array
    const newTodos = [...todos];
    // Toggle the isCompleted property of the selected todo
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    // Update the todos array with the modified todo
    setTodos(newTodos);
  };

  // Function to handle deleting a todo
  const handleDelete = (index) => {
    // Filter out the selected todo from the todos array
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      {/* Input field for adding a new todo */}
      <input
        className="todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Add a todo..."
      />
      {/* Button to add a new todo */}
      <button className="todo-button" onClick={handleAddTodo}>
        Add Todo
      </button>
      {/* List of todos */}
      <ul className="todo-list">
        {/* Map over the todos array and render each todo */}
        {todos.map((todo, index) => (
          <li
            key={index}
            className="todo-item"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
          >
            {/* Display the todo text */}
            <span>{todo.text}</span>
            {/* Button to mark a todo as complete or incomplete */}
            <button onClick={() => handleComplete(index)}>Complete</button>
            {/* Button to delete a todo */}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;