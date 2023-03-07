import { createContext, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  // nuestros estados de auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  // nuestras funciones de auth

  // esta funcion que va a contactar al backend, para validar el Token
  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      console.log("Token es valido");
      console.log(response);
      setIsLoggedIn(true)
      setLoggedUser(response.data)
    } catch (error) {
      console.log("Token invalido o no existe");
      console.log(error);
      setIsLoggedIn(false)
      setLoggedUser(null)
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUser,
    authenticateUser
  };

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
