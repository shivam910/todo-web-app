import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, TextField } from "@material-ui/core";
import { db } from "./firebase_config";
import firebase from "firebase"; //for using server timestamp
import TodoListItem from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      //onSnapshot instantly reflects the data
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id, //for deleting todo we need id
          todo: doc.data().todo,
          in_progress: doc.data().in_progress,
        }))
      );
    });
  }

  // Updating the todo to the server
  function addTodo(e) {
    e.preventDefault(); //Preventing reloading of page
    db.collection("todos").add({
      in_progress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    // After taking the i/p for clearing the i/p field i am using
    setTodoInput("");
  }

  return (
    <div className="App">
      <div className="enter">
        <h1>To-Do's List</h1>
        <form>
          {/* Input field */}
          <TextField
            id="standard-basic"
            label="What to do"
            value={todoInput}
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
            style={{ maxwidth: "300px", width: "40vw" }}
          />
          {/* Add Button */}
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            color="primary"
          >
            Add todo
          </Button>
        </form>

        {todos.map((todo) => (
          <TodoListItem
            todo={todo.todo}
            in_progress={todo.in_progress}
            id={todo.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
