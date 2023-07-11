import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import React from 'react'

type Task = {
  id: string;
  content: string;
  completed: boolean;
}

type TaskProps = {
  taskList: Task[];
  setTaskList: any;
  task: Task;
}

function LiTask(props: TaskProps)
{
  const {task, setTaskList, taskList} = props;

  //use filter method to return a new array without the element
  //and use setter to assign the new array to the getter
  function handleRemove(event: any) 
  {
    setTaskList(taskList.filter((item: any) => 
    {
      return item.id != task.id;
    } 
    ))
  }

  //everytime it maps (iterating each listed item),
  //check if this component's id matches with the listed item's id.
  //If so, inverse the boolean for "completed"
  //Aftering mapping, use setter to assign this new array to the getter
  function handleCheck(event :any)
  {
    setTaskList(
      taskList.map((item: any) => {
        if (item.id == task.id) {
          return {
            ...item, completed: !item.completed,
          }
          
        }
        return item;
      })
    )
    
  }

  return (
    //using template string, add "strikethrough" class if task.completed is true
    <li key={task.id} className={"task_in_list"}>
      <p className={`task_text ${task.completed && "strikethrough"}`}>{task.content}</p>
      <input className="task_check" checked={task.completed} type="checkbox" onChange={handleCheck}></input>
      <button className="task_button" onClick={handleRemove}>X</button>
    </li>
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
    //console.log(input);
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
        <ul id="task_list">
          {taskList.map((task: any) => {
            return (
              // <li key={task.id}>{task.content}</li>
              <LiTask 
                task={task}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
