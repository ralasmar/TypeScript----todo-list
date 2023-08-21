import { v4 as uuidV4 } from 'uuid'

//creating type "Task"
type Task = {
  id: string, 
  title: string
  completed: boolean
  createdAt: Date
}

//angle brackets with type of data expected inside 
const list = document.querySelector<HTMLUListElement>("#list")
//some functions dont accept above format
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
//defining task array
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if(input?.value == "" || input?.value == null) return

  //typescript is able to assume that this is type task because of the name (adding type anyway)
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ""
  
})

//instead of listing the type for each property, declaring it as type "Task" which will be created above
function addListItem(task: Task){
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

//setting up local storage
function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}