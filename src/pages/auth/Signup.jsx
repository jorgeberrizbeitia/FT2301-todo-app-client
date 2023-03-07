import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... signup logic here

    // pasariamos a contactar al backend para crear un usuario
    const newUser = {
      email: email,
      password: password
    }

    try {

      await signupService(newUser)
      navigate("/login")

    } catch (error) {
      // vamos a determinar el tipo de error que recibimos, y actuar diferente
      console.log(error.response.status) // codigo de error enviado
      console.log(error.response.data.errorMessage) // el mensaje de error que dio el fallo
      if (error.response.status === 400) {
        // mostramos al usuario como solventar el problema
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error")
      }
    }

  };

  return (
    <div>

      <h1>Sign Up</h1>
    
      <form onSubmit={handleSignup}>
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

        <button type="submit">Signup</button>
      </form>
      
    </div>
  );
}

export default Signup;
