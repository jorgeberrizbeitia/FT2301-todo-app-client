import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { AuthContext } from "../../context/auth.context";

function Login() {

  const { authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here

    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      // contactamos al BE para pasar las credenciales del usuario y validarlas
      const response = await loginService(userCredentials)
      console.log(response)

      // recibir el token del backend y almacenarlo en e LocalStorage
      localStorage.setItem("authToken", response.data.authToken)
      // 1. el nombre de la data a guardar
      // 2. la data a guardar

      // establecer mi Contexto para decirle a toda la app, que el usuario está activo
      authenticateUser()
      console.log("si vemos este console.log significa que el Token fue validado")

    } catch (error) {
      console.log(error)
      // vamos a determinar el tipo de error que recibimos, y actuar diferente
      console.log(error.response.status); // codigo de error enviado
      console.log(error.response.data.errorMessage); // el mensaje de error que dio el fallo
      if (error.response.status === 400) {
        // mostramos al usuario como solventar el problema
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
