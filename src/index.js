import React, { Fragment, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";

const App = () => {

  const [newTask, setNewTask] = useState("");
  const onInputChange = (event) => {
    setNewTask(event.target.value);
  };
  console.log(newTask);


  const [tasks, setTasks] = useState(
    window.localStorage.getItem("taskList")
      ? JSON.parse(window.localStorage.getItem("taskList"))
      : [
          { task: "Wash the car", isComplete: false, priority: "high" },
          { task: "Do Gardening", isComplete: true, priority: "medium" },
          { task: "Buy Groceries", isComplete: false, priority: "low" }
        ]
  );
  const addTask = () => {
    const taskObject = {
      task: newTask,
      isComplete: false
    };
    setTasks([...tasks, taskObject]);
  };
  useEffect(() => {
    window.localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);
  

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, taskIndex) => {
        if (taskIndex === index) {
          return {
            ...task,
            isComplete: !task.isComplete
          };
        }
        return task;
      })
    );
  };


  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);
  console.log(todos);
  

  const[priorities,setPriority] = useState("")
  const priorityList = [
    {
      value:1,
      label:"High"
    },
    {
      value:2,
      label:"Medium"
    },
    {
      value:3,
      label:"Low"
    }
  ]


  return (

    <Fragment>

      <h1>To-Do List App</h1>

      <input
        ref={inputRef}
        type="text"
        value={newTask}
        onChange={onInputChange}
        placeholder="Add new task here"
      />

      <button onClick={addTask}> Add </button>

      <ul>
        {tasks.map((taskObject, index) => {
          const clickedTask = () => {
            toggleTask(index);
          };
          return (
            <li onClick={clickedTask} key={index}>
              {taskObject.task} - 
              {taskObject.isComplete ? "✅" : "🕔"} - 
              {taskObject.priority} - 
              <button>delete</button>
              <Select
                options={priorityList}
                />
            </li>
          );
        })}
      </ul>

    </Fragment>
  );
};

ReactDOM.render(<App />, document.querySelector("#app-root"));
