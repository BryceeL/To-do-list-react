import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import React from 'react'

function Createli(props)
{
  const {id, task, completed} = props
  const [checkState, setChecked]: any = useState(completed)

  //checkbox function, strikingthrough the text
  const handleCheckBox = event => 
  {
    const liElements = event.target.parentNode.childNodes
    const taskText = liElements[1]
    
    if(event.target.checked == false) //if its false, it is actually true/checked?
    {
      console.log("Unchecked task: " + task)
      setChecked(false)
      taskText.classList.remove("strikethrough")

    }
    else if(event.target.checked == true)
    {
      console.log("Checked task: " + task)
      setChecked(true)
      taskText.classList.add("strikethrough")
    }
  }

  //deletes task (only the listed item element, not from array)
  const deleteTask = event =>
  {
    //temp solution
    const listItem = event.target.parentNode
    listItem.remove()
  }
  return (
    <li className="task_in_list" id={task.id}>
      <button className="task_button" onClick={deleteTask}>X</button>
      <p className="task_text">{task}</p>
      <input type="checkbox" className="task_check" onChange={handleCheckBox} checked={checkState}></input>
     </li>
  )
   
      
}

function App() {
  //states
  const [task, setTaskText] = useState("")
  const [taskList, setTask]: any = useState([])

  //DOM vars
  const taskUlEl = document.getElementById("task_list")
  const inputEl = document.getElementById("input_task")
  const addEl = document.getElementById("add_task_btn")

  //for check state
  function checkStateBtn ()
  {
    console.log(taskList)
  }
  //for getting the text from input field
  function handleInput(event)
  {
    setTaskText(event.target.value)
  }

  //adds object newTask to taskList
  function addTask(event)
  {
    if(task.trim() != "")
    {
      console.log("Added task: " + task)

      let newTask = {id: uuidv4(), task:task, completed:false} 

      setTask([...taskList,newTask])

      event.target.parentNode.firstChild.value = ""
      setTaskText("")
    }
    else
    {
      alert("You must fill in the input field to add a task.")
    }
  }

  //delete task
  function deleteTask(event)
  {
    //get task object from taskList based on its id
    const id = event.target.parentNode.getAttribute("id")
    const task = taskList.find(task => task.id = id)

    console.log("Deleted task: " + task.task)

    const newTaskList = taskList.filter(task => task.id !== id)
    setTask(newTaskList)
  }

  return (
    <div className="App">
      <h2>To Do List</h2>
      <div id= "task_div" className="center_element">
            <input type="text" id="input_task" onChange={handleInput} placeholder="Type here a task to add"></input>
            <button onClick={addTask} id="add_task_btn">Add</button>
            <button onClick={checkStateBtn} id="add_task_btn">Check State</button>
      </div>
      <ul id="task_list">
        {taskList.map((task) => 
              {
                return (
                  <Createli id={task.id} task={task.task} completed={task.completed}/>
                );
              })
            }
      </ul>
    </div>
  )
}

export default App;
