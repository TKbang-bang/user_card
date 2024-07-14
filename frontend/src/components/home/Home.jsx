import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "./from.css";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [buf, setBuf] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const allData = await axios.get("http://localhost:3000");
        setData(allData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="container">
      {data ? (
        <>
          <Card key={data.id} user={data} />;
        </>
      ) : (
        <div className="card no">
          <h3>Hola novato</h3>
          <h3>Bienvenido a mi pagina web</h3>
          <h3>Inicia sesion para mas diversion</h3>
          <Link to={"/login"}>Inicia sesion</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
