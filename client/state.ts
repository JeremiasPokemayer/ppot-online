import { update } from "firebase/database";
import * as dotenv from "dotenv";
dotenv.config();
import { Router } from "@vaadin/router";
import { getDatabase, ref, app, get, onValue } from "../client/db";
export type Jugada = "piedra" | "papel" | "tijera";
export type Game = {
  player1: Jugada;
  player2: Jugada;
};
const API_BASE_URL = process.env.API_BASE_URL;

const state = {
  data: {
    currentGame: {
      player1: {
        nombre: "",
        choice: "",
        start: false,
        online: false,
        result: "",
      },
      player2: {
        nombre: "",
        choice: "",
        start: false,
        online: false,
        result: "",
      },
    },
    history: [{}],
    puntajes: {
      puntajeP1: 0,
      puntajeP2: 0,
    },
    owner: false,
    rtdbRoomId: "",
    roomId: "",
    roomIdPublic: "",
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
    console.log("El state ha cambiado");
  },
  async listenRoom(rtdbRoomId, callback?: any) {
    const db = getDatabase(app);
    const roomRef = ref(db, `/rooms/${rtdbRoomId}/currentGame`);

    const unsubscribe = onValue(
      roomRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const roomData = snapshot.val();
          console.log("Datos de la sala actualizados");
          this.data.currentGame = roomData;
          this.setState(this.getState());
          if (typeof callback === "function") {
            callback();
          }
        } else {
          console.error("La sala no existe.");
        }
      },
      (error) => {
        console.error("Error al escuchar la sala:", error);
      }
    );

    return unsubscribe;
  },
  async setPlayer(nombre: string) {
    const cs = this.getState();
    cs.currentGame.player1.nombre = nombre;
    this.setState(cs);
  },
  async setPlayer2(nombre: string) {
    const cs = this.getState();
    cs.currentGame.player2.nombre = nombre;
    this.setState(cs);
  },
  async createGame(callback?) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre: this.data.currentGame.player1.nombre }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el juego");
      }

      const data = await response.json();
      this.data.roomId = data.id;
      this.setState(this.data);
      if (callback) callback();
    } catch (error) {
      console.error("Error:", error);
    }
  },
  async createRoom(callback?) {
    fetch(`${API_BASE_URL}/rooms`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId: this.data.roomId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear el juego");
        }
        return response.json();
      })
      .then((data) => {
        this.data.roomIdPublic = data.id;
        this.setState(this.data);
        callback();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  async setReadyP1() {
    const cs = this.getState();
    const db = getDatabase(app);
    const roomRef = ref(
      db,
      `/rooms/${this.data.rtdbRoomId}/currentGame/player1`
    );
    try {
      await update(roomRef, {
        start: true,
      });
      cs.currentGame.player1.start = true;
      console.log("Datos del Player 1 guardados en la RTDB exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos en la RTDB:", error);
    }
  },
  async setReadyP2(ready: boolean) {
    const cs = this.getState();
    const db = getDatabase(app);
    const roomRef = ref(
      db,
      `/rooms/${this.data.rtdbRoomId}/currentGame/player2`
    );
    try {
      await update(roomRef, {
        start: ready,
      });
      cs.currentGame.player2.start = ready;
      console.log("Datos del Player 2 guardados en la RTDB exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos en la RTDB:", error);
    }
  },
  async getRoomId(roomIdPublic: string, callback?) {
    fetch(`${API_BASE_URL}/rooms/${roomIdPublic}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuario no encontrado");
        }
        return response.json();
      })
      .then((data) => {
        state.data.rtdbRoomId = data;
        callback();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  async getRtdbId(roomIdPublic) {
    const cs = this.getState();
    return fetch(`${API_BASE_URL}/rooms/${roomIdPublic}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sala no encontrada");
        }
        return response.json();
      })
      .then((data) => {
        cs.rtdbRoomId = data;
      });
  },
  async joinRoom(rtdbRoomId) {
    const cs = this.getState();
    const db = getDatabase(app);
    const roomRef = ref(db, `/rooms/${rtdbRoomId}`);
    try {
      const snapshot = await get(roomRef);

      if (!snapshot.exists()) {
        throw new Error("Sala no encontrada");
      }

      const roomData = snapshot.val();

      if (!roomData || !roomData.currentGame) {
        throw new Error("Datos de la sala no válidos");
      }

      const dataUsuarios = roomData.currentGame;
      this.data.currentGame.player1 = dataUsuarios.player1;

      await this.listenRoom(rtdbRoomId);
      this.setState(cs);
    } catch (error) {
      console.error("Error al unirse a la sala:", error);
    }
  },
  async setDatabaseP1() {
    const db = getDatabase(app);
    const roomRef = ref(db, `/rooms/${this.data.rtdbRoomId}/currentGame/`);
    try {
      await update(roomRef, {
        player1: {
          nombre: this.data.currentGame.player1.nombre,
          choice: "",
          online: true,
          start: false,
        },
      });
      console.log("Datos del Player 1 guardados en la RTDB exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos en la RTDB:", error);
    }
  },
  async setDatabaseP2() {
    const db = getDatabase(app);
    const roomRef = ref(db, `/rooms/${this.data.rtdbRoomId}/currentGame/`);
    try {
      await update(roomRef, {
        player2: {
          nombre: this.data.currentGame.player2.nombre,
          choice: "",
          online: true,
          start: false,
        },
      });
      console.log("Datos del Player 2 guardados en la RTDB exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos en la RTDB:", error);
    }
  },
  async setMoveP1(moveP1: Jugada) {
    const cs = this.getState();
    const db = getDatabase(app);
    const roomRef = ref(
      db,
      `/rooms/${this.data.rtdbRoomId}/currentGame/player1`
    );
    try {
      await update(roomRef, {
        choice: moveP1,
      });
      console.log("Movimiento del Player 1 guardados en la RTDB exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos en la RTDB:", error);
    }
    cs.currentGame.player1.choice = moveP1;
    this.setState(cs);
  },
  async setMoveP2(moveP2: Jugada) {
    const cs = this.getState();
    const db = getDatabase(app);
    const roomRef = ref(
      db,
      `/rooms/${this.data.rtdbRoomId}/currentGame/player2`
    );
    try {
      await update(roomRef, {
        choice: moveP2,
      });
      console.log("Movimiento del Player 2 guardados en la RTDB exitosamente.");
    } catch (error) {
      console.error("Error al guardar los datos en la RTDB:", error);
    }
    cs.currentGame.player2.choice = moveP2;
    this.setState(cs);
  },
  async pushToHistory(play: Game) {
    const currentState = this.getState();
    currentState.history.push(play);
  },
  async setPuntaje(player1: Jugada, player2: Jugada) {
    if (
      (player1 == "tijera" && player2 == "papel") ||
      (player1 == "piedra" && player2 == "tijera") ||
      (player1 == "papel" && player2 == "piedra")
    ) {
      this.data.puntajes.puntajeP1++;
    } else if (player1 == player2) {
      this.data.puntajes.puntajeP1++;
      this.data.puntajes.puntajeP2++;
    } else {
      this.data.puntajes.puntajeP2++;
    }
  },
  createPlayerElement(move) {
    let playerElement;
    if (move === "piedra") {
      playerElement = document.createElement("custom-piedra");
    } else if (move === "papel") {
      playerElement = document.createElement("custom-papel");
    } else if (move === "tijera") {
      playerElement = document.createElement("custom-tijera");
    }
    return playerElement;
  },
  whoWins(player1: Jugada, player2: Jugada): string {
    if (
      (player1 == "tijera" && player2 == "papel") ||
      (player1 == "piedra" && player2 == "tijera") ||
      (player1 == "papel" && player2 == "piedra")
    ) {
      this.data.currentGame.player1.result = "Ganaste";
      this.data.currentGame.player2.result = "Perdiste";
      return "player1";
    } else if (player1 == player2) {
      this.data.currentGame.player1.result = "Empate";
      this.data.currentGame.player2.result = "Empate";
      return "Empate";
    } else {
      this.data.currentGame.player1.result = "Perdiste";
      this.data.currentGame.player2.result = "Ganaste";
      return "player2";
    }
  },
};

export { state };
