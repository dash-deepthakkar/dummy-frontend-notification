import React, { useEffect, useState } from "react";
import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from "@stomp/stompjs";

export const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjE3IiwiaWF0IjoxNzcwMDk4NjM0LCJleHAiOjE3NzAxMTY2MzQsInJlc291cmNlSWQiOjQxMjMzMjA0NzksInR5cGUiOiJBQ0NFU1MiLCJ1c2VySWQiOjQxMjMzMjA0NzksInNzbyI6IiIsInVzZXJuYW1lIjoiYWRtaW4xNyIsInNpZCI6MTcsImNvcnBvcmF0ZUlkIjoxLCJ0aW1lc3RhbXAiOjE3NzAwOTg2MzQ5MDh9.rD-6l1rs0CtDUEmOCsyheaidq7ZHPgc6pvHvU6GotBE";

export default function NotificationStompClient() {
  const WS_URL = "http://localhost:8083/ws";
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // localStorage.setItem("AUTH_TOKEN", AUTH_TOKEN);
    // console.log("WS token stored:", localStorage.getItem("AUTH_TOKEN"));

    // const token = localStorage.getItem("AUTH_TOKEN");

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        // Authorization: `Bearer ${token}`,
        Credential: true
      },
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("STOMP connected");
        setConnected(true);
      },
      onStompError: (frame) => {
        console.error(
          "Broker reported error",
          frame.headers["message"]
        );
        console.error("Additional details", frame.body);
      },
      onWebSocketClose: () => {
        console.log("WebSocket closed");
        setConnected(false);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div>
      <h3>WebSocket Notifications</h3>
      <p>Status: {connected ? "Connected" : "Disconnected"}</p>
    </div>
  );
}
