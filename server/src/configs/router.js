const express = require("express");
const db = require("./db.js");
const upload = require("./multer.js");

const router = express.Router();

//GETTING DATA FOR PRINCIPAL PAGE
router.get("/", (req, res) => {
  const q = "SELECT * FROM self_user";
  db.query(q, (err, data) => {
    if (err) return res.json({ err });
    res.send(data[0]);
  });
});

//REGISTER SETTINGS
router.post("/register", (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json({ err });

    if (data.length > 0) {
      res.send(false);
    } else {
      const q2 =
        "INSERT INTO users (`name`, `email`, `rol`, `password`) VALUES (?)";

      db.query(
        q2,
        [[req.body.name, req.body.email, req.body.rol, req.body.pass]],
        (error, newData) => {
          if (error) return res.json({ error });
          const qini =
            "INSERT INTO self_user (`name`, `email`, `rol`, `password`) VALUES (?)";
          db.query(
            qini,
            [[req.body.name, req.body.email, req.body.rol, req.body.pass]],
            (errini, dataini) => {
              if (errini) return res.json({ errini });
              res.send("Usuario agregada");
            }
          );
        }
      );
    }
  });
});

//LOGIN SETTINGS
router.post("/login", (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length < 1) {
      res.send(false);
    } else {
      const qdel = "DELETE FROM self_user";
      db.query(qdel, (errdel, dataDel) => {
        if (errdel) return res.json({ errdel });
        const q3 = "SELECT * FROM users WHERE email = ? AND password = ?";
        db.query(q3, [req.body.email, req.body.pass], (error, newData) => {
          if (error) return res.json({ error });
          if (newData.length > 0) {
            const q4 =
              "INSERT INTO self_user (`id`, `name`, `email`, `password`, `rol`, `img`) VALUES (?)";
            const allData = [
              newData[0].id,
              newData[0].name,
              newData[0].email,
              newData[0].password,
              newData[0].rol,
              newData[0].img,
            ];
            db.query(q4, [[...allData]], (err4, data4) => {
              if (err4) return res.json({ err4 });
              res.send("Sesion iniciada");
            });
          } else {
            res.send("notlike");
          }
        });
      });
    }
  });
});

//DELETE FROM 'cerrar sesion'
router.delete("/delete", (req, res) => {
  const q = "DELETE FROM self_user";
  db.query(q, (err, data) => {
    if (err) return res.json({ err });
    res.send("Sesion cerrada");
  });
});

//UPLOADING IMAGES FROM CLIENT TO SERVER
router.post("/upload", upload, (req, res) => {
  const qreq = "SELECT id FROM self_user";
  db.query(qreq, (errreq, datareq) => {
    if (errreq) return res.json({ errreq });
    const idSelf = datareq[0].id;

    const q = "UPDATE self_user SET `img` = ? WHERE id = " + idSelf;
    const newName = req.file.filename;
    db.query(q, [newName], (err, data) => {
      if (err) return res.json({ err });
      const q2 = "UPDATE users SET `img` = ? WHERE id = " + idSelf;
      db.query(q2, [newName], (err2, data2) => {
        if (err2) return res.json({ err2 });
        res.send("Imagen agregada");
      });
    });
  });
});

//DELETE EVERY DATA FROM USER
router.delete("/deleteall", (req, res) => {
  const q = "SELECT id FROM self_user";
  db.query(q, (err, data) => {
    if (err) return res.json({ err });
    const id = data[0].id;
    const qDel = "DELETE FROM self_user";
    db.query(qDel, (errDel, data) => {
      if (errDel) return res.json({ errDel });
      const delUser = "DELETE FROM users WHERE id = ?";
      db.query(delUser, [id], (errUser, dataUser) => {
        if (errUser) return res.json({ errUser });
        res.send("Usuario borrado");
      });
    });
  });
});

module.exports = router;
