import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AddForm from "../components/AddForm";

function TodoList(props) {

  const [ allTodos, setAllTodos ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    getData()
  }, []) // componentDidMount 

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/todo")
      console.log(response)
      setAllTodos(response.data)
      setIsFetching(false)

    } catch (error) {
      console.log(error)
    }
  }

  if (isFetching === true) {
    return <h3>... buscando</h3>
  }

  return (
    <div>
      <AddForm />
      <hr />
      <h3>Lista de To-Do</h3>

      {allTodos.map((eachTodo) => {
        return <li>{eachTodo.title}</li>
      })}

    </div>
  );
}

export default TodoList;
