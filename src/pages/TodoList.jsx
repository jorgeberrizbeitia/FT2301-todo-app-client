import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddForm from "../components/AddForm";
import { getAllTodosService } from "../services/todo.services";

function TodoList() {

  const [ allTodos, setAllTodos ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    getData()
  }, []) // componentDidMount 

  const getData = async () => {
    setIsFetching(true) // para que en segundas llamadas vuelvas a mostrar el spinner
    try {
      // const response = await axios.get("http://localhost:5005/api/todo")
      const response = await getAllTodosService()
      console.log(response)
      setAllTodos(response.data)
      setIsFetching(false)
      
      // abajo para replicar un entorno real de deplot y probar los spinners
      // setTimeout(() => {
      //   setAllTodos(response.data)
      //   setIsFetching(false)
      // }, 1000)

    } catch (error) {
      console.log(error)
      // aqui deberia haber un navigate("/error")
    }
  }

  if (isFetching === true) {
    return <h3>... buscando</h3>
  }

  return (
    <div>
      <AddForm getData={getData}/>
      <hr />
      <h3>Lista de To-Do</h3>

      {allTodos.map((eachTodo) => {
        return (
          <p key={eachTodo._id}>
            <Link to={`/todos/${eachTodo._id}/details`}>{eachTodo.title}</Link>
          </p>
        )
      })}

    </div>
  );
}

export default TodoList;
