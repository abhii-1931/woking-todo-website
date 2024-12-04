import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState('')
  const [todos, Settodos] = useState([])
  const entertodo = useRef()

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring){

      let todos = JSON.parse(localStorage.getItem("todos"))
      Settodos(todos)
    }
  },[])
  

  const saveToLocal = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  let handlechange = (e)=>{
    setTodo(e.target.value)
  }
  
  let addtodo = ()=>{
    Settodos([...todos, {id: uuidv4(), todo:todo, idDone:false}])
    saveToLocal()
    setTodo('')
  }
  
  let checkboxdisplay = (e)=>{
    let index = todos.findIndex(item=>{
      return item.id === e.target.name
    })
    let newtodos = [...todos]
    newtodos[index].idDone = !newtodos[index].idDone
    console.log(e.target)
    console.log(newtodos[index].idDone)
    Settodos(newtodos)
    saveToLocal()
  }
  
  
  let handledelet = (e, id)=>{
    let x = confirm('are you sure You want to delet this todo')
    if (x) { 
      let newtodos = todos.filter((item)=>{
        return item.id != id
      })
      Settodos(newtodos)
    }
    saveToLocal()
  }

  let handleedit = (e, id)=>{
    let todo = todos.filter(item=>{
      return item.id == id
    })
    setTodo(todo[0].todo)
    let newtodos = todos.filter((item)=>{
      return item.id != id
    })
    Settodos(newtodos)
    saveToLocal()
  }
  return (
    <>
    <Navbar/>
    <div className='main w-3/6 m-auto mt-5 bg-blue-100 rounded-lg p-3'>
      <div className="upper">
        <h1 className='font-bold'>Add Todo</h1>
        <div className="addtodo flex gap-3">
          <input ref={entertodo} className = "w-3/4" type="text" value={todo} onChange={handlechange}/>
          <button className='bg-blue-600 text-white px-2 rounded-md' onClick={addtodo}>add</button>
        </div>
      </div>
      <div className="todos pt-10">
        <h1 className='font-bold'>Your Todos</h1>
       { todos.map(item =>{
        return (<div key={item.id} className="todo flex justify-between pt-2">
          <div className='flex gap-2 items-center'>
            <input name={item.id} onChange={checkboxdisplay} checked={item.isDone} type="checkbox" id=""/>
            <h5 className={item.isDone?"line-through":""}>{item.todo}</h5>
          </div>
          <div className="editdelet flex gap-3">
            <button onClick={(e)=>{handleedit(e, item.id)}} className="edit bg-blue-600 text-white px-2 rounded-md">Edit</button>
            <button onClick={(e)=>{handledelet(e, item.id)}} className="delet bg-blue-600 text-white px-2 rounded-md">Delet</button>
          </div>
        </div>)
        })}
      </div>
    </div>
    </>
  )
}

export default App
