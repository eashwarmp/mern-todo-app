import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../headerFooter/Header";
import "./Todo.css";

const ViewTodo = (props) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('')
  const [priority, setPriority] = useState('')
  const [completion, setCompletion] = useState('')

  const populateTodos = async () => {
    console.log("Yaaay");
    try {
      let { data } = await axios.get("http://localhost:8080/todos");
      if (data.length > 0) {
        setTodos(data);
        //Reset input fields
        setTodo('');
        setPriority('');
        setCompletion('');
      }
    } catch (e) {
      console.error(
        "There was an exception in making the service call to fetch todos"
      );
    }
  };
  useEffect(() => {
    populateTodos();
  }, []);

  const deleteTodos = async (e) => {
    console.log(e.target.getAttribute("data-value"));
    if (e.target.getAttribute("data-value")) {
      // Perform delete service call
      let todoId = e.target.getAttribute("data-value");
      try {
        let resp = await axios.delete(`http://localhost:8080/todos/${todoId}`);
        console.log(resp);
        //Re-render the component
        populateTodos();
      } catch (e) {
        console.log("There was an exception", e);
      }
    }
  };

  // Submit the form
  const submitTodo = (e) => {
    e.preventDefault();
    if (todo && priority && completion) {
        console.log(props)
        addTodoServiceCall();
    }
    console.log(e);
}

//The todo is added through the POST Service Call
const addTodoServiceCall = async () => {
    let reqData = {
        todo,
        completed: completion,
        priority,
        profileId: "901"
    }
    try {
        let response = await axios.post('http://localhost:8080/todos', reqData)
        console.log('Success response---------->', response)
        populateTodos();
    } catch(e) {
        console.log('Error------------->',e) 
    }
}

  const renderTodos = () => {
    if (todos && todos.length > 0) {
      return (
        <>
          <table>
            <tr>
              <th>S.no</th>
              <th>Todo</th>
              <th>Priority</th>
              <th>Completed?</th>
              <th>Remove Todo</th>
            </tr>
            {todos.map((data, index) => (
              <>
                <tr key={index}>
                  <td>{index}</td>
                  <td>{data.todo}</td>
                  <td>{data.priority}</td>
                  <td>{String(data.completed)}</td>
                  <td>
                    <button
                      onClick={(e) => deleteTodos(e)}
                      data-value={data._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </table>
        </>
      );
    } else {
      return (
        <>
          <div style={{ marginTop: "20px" }}>
            <strong>No todos present...</strong>
          </div>
        </>
      );
    }
  };

  const renderAddTodoView = () => {
    return (
      <>
        <div class='col-12' style={{ marginTop: "30px" }}>
          <h3>Add your new todos here:</h3>
        </div>
        <form>
          <div class='row' style={{ marginTop: "30px" }}>
            <div class='col-4'>
              <label>
                <strong>Todo:</strong>
              </label>
              <input
                id='todoVal'
                type='text'
                onChange={(e) => setTodo(e.target.value)}
                name='todo'
                value={todo}
              />
            </div>
            <div class='col-4'>
              <label>
                <strong>Priority:</strong>
              </label>
              <select
                name='Priority'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                id='select_priority'
              >
                <option value=''>
                  --Please choose the level of importance--
                </option>
                <option value='Important'>Important</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
              </select>
            </div>
            <div class='col-4'>
              <label>
                <strong>Completion:</strong>
              </label>
              <select
                name='Completion'
                value={completion}
                onChange={(e) => setCompletion(e.target.value)}
                id='select_completion'
              >
                <option value=''>--Status of Completion--</option>
                <option value='true'>true</option>
                <option value='false'>false</option>
              </select>
            </div>
          </div>
          <div class='col-12' style={{ marginTop: "20px" }}>
            <input
              type='submit'
              onClick={(e) => submitTodo(e)}
              onSubmit={(e) => submitTodo(e)}
              value='Submit form'
            />
          </div>
        </form>
      </>
    );
  };
  return (
    <>
      <Header title='Todos' />
      <div>
        Here you see below the list of todos we have for the specified user
      </div>
      {renderTodos()}
      {renderAddTodoView()}
    </>
  );
};

export default ViewTodo;
