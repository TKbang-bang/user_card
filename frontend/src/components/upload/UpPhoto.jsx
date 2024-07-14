import React, { useEffect, useRef, useState } from "react";
import "./upPhoto.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpPhoto() {
  const [file, setFile] = useState(null);
  const [er, setEr] = useState("");
  const navigate = useNavigate();
  const [pic, setPic] = useState(null);
  const [upImg, setUpImg] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const allData = await axios.get("http://localhost:3000");
        setPic(allData.data.img);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setUpImg(reader.result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  };

  const handleSubmit = async (e) => {
    setEr("");
    e.preventDefault();
    if (file != null) {
      setEr("");
      try {
        const formData = new FormData();
        formData.append("img", file);
        await axios.post("http://localhost:3000/upload", formData);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      setEr("No agregaste ningun archivo");
    }
  };

  const HandleInputClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="upload">
      <form onSubmit={handleSubmit}>
        {file != null ? (
          <img src={upImg} />
        ) : pic ? (
          <img src={"http://localhost:3000/" + pic} />
        ) : (
          <img src="../../../public/images/default.png" />
        )}

        <input
          type="file"
          name="img"
          onChange={handleChange}
          accept="image/*"
          className="inputPhoto"
          ref={inputRef}
        />
        <p onClick={HandleInputClick} className="pClick">
          <span>+</span> Seleccionar imagen
        </p>
        <p className="er">{er}</p>
        <button type="submit">Agregar foto</button>
      </form>
    </div>
  );
}

export default UpPhoto;
