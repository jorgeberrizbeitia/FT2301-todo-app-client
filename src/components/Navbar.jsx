import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate = useNavigate()

  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  const handleLogout = () => {
    // para hacer logout simplemente tenemos que eliminar el token
    localStorage.removeItem("authToken")
    // cambiar los valores de los estados (isLoggedIn y loggedUser)
    authenticateUser()

    // redireccionamos al usuario
    navigate("/")
  }

  if (isLoggedIn === true) {
    return (
      <div>
        <NavLink to="/" style={toggleStyles}>Home</NavLink>
        <NavLink to="/todos" end={true} style={toggleStyles}>Ver Lista</NavLink>
        <span onClick={handleLogout}>Logout</span>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to="/" style={toggleStyles}>Home</NavLink>
        <NavLink to="/signup" style={toggleStyles}>Registro</NavLink>
        <NavLink to="/login" style={toggleStyles}>Acceso</NavLink>
      </div>
    );
  }

}

export default Navbar;
