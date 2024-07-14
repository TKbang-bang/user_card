import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [er, setEr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email != "" && pass != "" && pass2 != "") {
      if (pass == pass2) {
        setEr("");
        try {
          const logUpload = await axios.post("http://localhost:3000/login", {
            email,
            pass,
          });
          if (logUpload.data == false) {
            setEr("Email no encontrado");
          } else if (logUpload.data == "notlike") {
            setEr("Contraseña incorrecta");
          } else {
            setEr("");
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setEr("Las contraseñas no coinciden");
      }
    } else {
      setEr("Rellena todos los campos");
    }
  };

  const handleClick = () => {
    const pg = document.getElementsByClassName("pass");
    const pg2 = document.getElementsByClassName("pass2");
    if (pg[0].type == "password") {
      pg[0].type = "text";
      pg2[0].type = "text";
    } else {
      pg[0].type = "password";
      pg2[0].type = "password";
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Inicia sesion</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Contraseña"
          className="pass"
        />
        <input
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          type="password"
          placeholder="Contraseña"
          className="pass2"
        />
        <div className="mostrar">
          <label htmlFor="checkbox">Mostrar contraseña</label>
          <input
            type="checkbox"
            className="check"
            id="checkbox"
            onClick={handleClick}
          />
        </div>
        <p className="err">{er}</p>
        <button type="submit">Inicia sesion</button>
        <p>
          ¿Todavia no tienes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
