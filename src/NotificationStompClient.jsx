  import React, { useEffect, useState } from "react";
  import SockJS from 'sockjs-client/dist/sockjs';
  import { Client } from "@stomp/stompjs";

  export const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjE3IiwiaWF0IjoxNzcwMTgyMDEyLCJleHAiOjE3NzAyMDAwMTIsInJlc291cmNlSWQiOjQxMjMzMjA0NzksInR5cGUiOiJBQ0NFU1MiLCJ1c2VySWQiOjQxMjMzMjA0NzksInNzbyI6IiIsInVzZXJuYW1lIjoiYWRtaW4xNyIsInNpZCI6MTcsImNvcnBvcmF0ZUlkIjoxLCJ0aW1lc3RhbXAiOjE3NzAxODIwMTIwNjR9.LwP_lPFzyiQmSYuRrxN4U2bv1gBWduxN9uZTrLD3bm8";
  
    export default function NotificationStompClient() {
    const WS_URL = "http://localhost:8083/ws";
    const [connected, setConnected] = useState(false);

    useEffect(() => {
      // localStorage.setItem("AUTH_TOKEN", AUTH_TOKEN);
      // console.log("WS token stored:", localStorage.getItem("AUTH_TOKEN"));
      // const token = localStorage.getItem("AUTH_TOKEN");

      // Set the cookie (not just localStorage)
  document.cookie = `Authorization=${AUTH_TOKEN}; path=/; SameSite=Lax`;
  console.log("Cookie set:", document.cookie);

     const client = new Client({
  webSocketFactory: () =>
    new SockJS(WS_URL, null, {
      withCredentials: true
    }),

  // OPTIONAL: keep header auth also
  // connectHeaders: {
  //   Authorization: `Bearer ${token}`,
  // },

  debug: (str) => console.log(str),

  onConnect: () => {
    console.log("STOMP connected");
    setConnected(true);
  },

  onStompError: (frame) => {
    console.error("Broker error", frame.headers["message"]);
    console.error("Details", frame.body);
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
