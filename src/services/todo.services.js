// todas las funciones que contactan al BE solo para CRUD de Todos
import service from "./config.services";

// vamos a crear un funcion para cada Ruta definida en el BE

const getAllTodosService = () => {
  return service.get("/todo")
}

const createOneTodo = (newTodo) => {
  return service.post("/todo", newTodo)
}

const getSingleTodoService = (todoId) => {
  return service.get(`/todo/${todoId}`)
}

const deleteOneTodoService = (todoId) => {
  return service.delete(`/todo/${todoId}`)
}

const updateOneTodoService = (todoId, updatedTodo) => {
  return service.patch(`/todo/${todoId}`, updatedTodo)
}


export {
  getAllTodosService,
  createOneTodo,
  getSingleTodoService,
  deleteOneTodoService,
  updateOneTodoService
}