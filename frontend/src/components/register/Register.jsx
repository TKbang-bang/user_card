import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [er, setEr] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass != pass2) {
      setEr("Las contraseñas no coinciden");
    } else {
      setEr("");
      if (name != "" && email != "" && rol != "" && pass != "" && pass2 != "") {
        try {
          const regUpload = await axios.post("http://localhost:3000/register", {
            name,
            email,
            rol,
            pass,
          });
          if (regUpload.data == false) {
            setEr("Email ya en uso");
          } else {
            setEr("");
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setEr("Rellana todos los campos");
      }
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
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Registrate</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="name"
          placeholder="Nombre"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          type="text"
          placeholder="Rol"
        />
        <input
          className="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Contraseña"
        />
        <input
          className="pass2"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          type="password"
          placeholder="Contraseña"
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
        <button type="submit">Registrar</button>
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesion</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
