import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { createOneTodo } from "../services/todo.services";

function AddForm(props) {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleIsUrgentChange = (e) => setIsUrgent(e.target.checked); // checked es para campos de checkbox

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // contactamos al backend para que creen el Todo y le pasamos la data
    const newTodo = {
      title: title,
      description: description,
      isUrgent: isUrgent
    }

    try {
      
      // const response = await axios.post("http://localhost:5005/api/todo", newTodo) // segundo argumento es el req.body
      const response = await createOneTodo(newTodo)
      console.log(response)
      // navigate("/todos") // esto no funciona, react no refresca los componente cuando redirigimos a l mismo lugar
      props.getData() // busca los todo actualizado luego de crear uno nuevo
    } catch (error) {
      console.log(error)
      // aqui deberia haber un navigate("/error")
    }

  }

  return (
    <div>
      <h3>Agregar To-Do</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />
        <br />
        <label htmlFor="isUrgent">Urgent</label>
        <input
          type="checkbox"
          name="isUrgent"
          onChange={handleIsUrgentChange}
          checked={isUrgent}
        />
        <br />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AddForm;
