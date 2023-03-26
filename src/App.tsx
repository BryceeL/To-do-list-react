import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import React from 'react'

function updateTaskList(props: any)
{
  return (
    alert("a")
  )
}

function App() 
{
  //states
  const [input, setInput]: any = useState("");
  const [taskList, setTaskList]: any = useState([]);

   //use state to update the input
  function handleInput(event: any)
  {
    setInput(event.target.value);
    console.log(input);
  }

  //creates task, use setter to add it, clear input
  function addTask(event: any)
  {
   if(input.trim() != "")
   {
     const task = {
       id: uuidv4(),
       content: input,
       completed: false
     };
     setTaskList([...taskList,task]);

     //input html has value attribute as getter "input"
     //thus, using the setter to "" will be reflected in input html
     //power of react
     setInput("")
   }
   else
   {
     alert("You must fill in the input field to add a task.");
   }
  }

  //debug
  function printTaskList(event: any)
  {
    console.log(taskList);
  }

  return (
    <div className="App">
      <h2>To do List</h2>
      <div>
        <input type="text" onChange={handleInput} value={input} placeholder="add task"></input>
        <button onClick={addTask}>Add</button>
        <button onClick={printTaskList}>Check list</button>
        <ul>
          {taskList.map((task: any) => {
            return (
              <li key={task.id}>{task.content}</li>
            )
          })}
        </ul>
    </div>
    </div>
  );
}

export default App;
