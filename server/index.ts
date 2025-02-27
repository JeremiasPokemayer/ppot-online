import { firestore, db } from "./db";
import { nanoid } from "nanoid";
import * as cors from "cors";
import * as express from "express";

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const usersCollection = firestore.collection("users");
const roomCollection = firestore.collection("rooms");

app.get("/users", (req, res) => {
  const { nombre } = req.query;
  usersCollection
    .get()
    .then((snap) => {
      if (!snap.empty) {
        let idLargo = null;
        snap.forEach((doc) => {
          const userData = doc.data();
          if (userData.nombre === nombre) {
            idLargo = { idLargo: doc.id };
          }
        });
        if (idLargo) {
          res.json(idLargo);
        } else {
          res.status(404).json({ message: "Usuario no encontrado" });
        }
      } else {
        res.status(404).json({ message: "No hay usuarios en la sala" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((snap) => {
      if (snap.exists) {
        const data = snap.data();
        res.json(data);
      } else {
        res.status(404).json({ message: "No existe ese usuario" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { roomId } = req.params;
  roomCollection
    .doc(roomId.toString())
    .get()
    .then((snap) => {
      if (snap.exists) {
        const data = snap.data();
        res.json(data.rtdbRoomId);
      } else {
        res.status(404).json({ message: "No existe ese usuario" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.post("/signup", (req, res) => {
  const nombre = req.body.nombre;
  usersCollection
    .where("nombre", "==", nombre)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        usersCollection
          .add({
            nombre,
          })
          .then((newUserRef) => {
            res.json({
              id: newUserRef.id,
            });
          });
      } else {
        res.json({
          id: searchResponse.docs[0].id,
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = db.ref("/rooms/" + nanoid());
        roomRef
          .set({
            currentGame: {
              player1: {
                nombre: "",
                choice: "",
                online: false,
                start: false,
                result: "",
              },
              player2: {
                nombre: "",
                choice: "",
                online: false,
                start: false,
                result: "",
              },
            },
          })
          .then((rtdbRes: any) => {
            const roomLongId = roomRef.key;
            const roomId = 100000 + Math.floor(Math.random() * 999999);
            roomCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomLongId,
              })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                });
              })
              .catch((error) => {
                res.status(500).json({ error: error.message }); // Manejo de errores
              });
          })
          .catch((error) => {
            res.status(500).json({ error: error.message }); // Manejo de errores
          });
      } else {
        res.status(401).json({
          message: "no existe",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message }); // Manejo de errores
    });
});

app.listen(port, () => {
  console.log("El servidor se inicio en el puerto: ", port);
});
