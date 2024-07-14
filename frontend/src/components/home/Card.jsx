import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card({ user }) {
  const [del, setDel] = useState(false);

  const handleDel = async () => {
    try {
      await axios.delete("http://localhost:3000/delete");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelAll = async () => {
    try {
      await axios.delete("http://localhost:3000/deleteall");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      {user.img ? (
        <div>
          <img src={"http://localhost:3000/" + user.img} alt="" />
          <Link to={"/upload"}>
            <span>+</span> Actualizar foto
          </Link>
        </div>
      ) : (
        <div>
          <img src={"../../../public/images/default.png"} />
          <Link to={"/upload"}>
            <span>+</span> Agregar foto
          </Link>
        </div>
      )}
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.rol}</p>
      <Link onClick={handleDel} to={"/login"}>
        Cerrar sesion
      </Link>
      <div className="divDel">
        {!del ? (
          <button onClick={() => setDel(true)}>Borrar Cuenta</button>
        ) : (
          <>
            <p>¿Estas seguro de borrar tu cuenta?</p>
            <div>
              <button onClick={handleDelAll}>Si</button>
              <button onClick={() => setDel(false)}>No</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
