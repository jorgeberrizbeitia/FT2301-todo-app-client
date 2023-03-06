import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { deleteOneTodoService, getSingleTodoService } from "../services/todo.services"

function TodoDetails() {

  const navigate = useNavigate()
  const params = useParams()
  console.log(params)

  const [ singleTodo, setSingleTodo ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // const response = await axios.get(`http://localhost:5005/api/todo/${params.todoId}`)
      const response = await getSingleTodoService(params.todoId)
      console.log(response)
      setSingleTodo(response.data)
      setIsFetching(false)

    } catch (error) {
      navigate("/error")
    }
  }

  const handleDeleteTodo = async () => {

    try {
      
      await deleteOneTodoService(params.todoId)
      navigate("/todos")

    } catch (error) {
      navigate("/error")
    }

  }

  return (
    <div>
      <h3>Detalles de To-Do</h3>

      { isFetching === true 
      ? <h3>...buscando</h3>
      : <div>
        <h4>{singleTodo.title}</h4>
        <p>{singleTodo.description}</p>
        <p>Es Urgente: {singleTodo.isUrgent === true ? "👍" : "👎"}</p>
        <button onClick={handleDeleteTodo}>Borrar</button>
        <Link to={`/todos/${params.todoId}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
    }

    </div>
  );
}

export default TodoDetails;
