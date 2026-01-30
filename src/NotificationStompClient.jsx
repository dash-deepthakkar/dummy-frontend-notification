import React, { useEffect, useState } from "react";
import SockJS from 'sockjs-client/dist/sockjs';

import { Client } from "@stomp/stompjs";


export default function NotificationStompClient() {
    const WS_URL = "http://localhost:8083/ws"; // Spring SockJS endpoint
    // const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjE2IiwiaWF0IjoxNzY5NjY4Mjg1LCJleHAiOjE3Njk2ODYyODUsInJlc291cmNlSWQiOjQxMjMxNDQ3MDQsInR5cGUiOiJBQ0NFU1MiLCJ1c2VySWQiOjQxMjMxNDQ3MDQsInNzbyI6IiIsInVzZXJuYW1lIjoiYWRtaW4xNiIsInNpZCI6MTYsImNvcnBvcmF0ZUlkIjoxLCJ0aW1lc3RhbXAiOjE3Njk2NjgyODUxMTB9.zKlE0kSkP6kBEM31AC3U4xK4zrxeOXquSG5-sBrRkpk";

  useEffect(() => {
    // Create STOMP client using SockJS
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        // Adapt this to what WebSocketAuthInterceptor expects:
        // Common patterns:
        // Authorization: `Bearer ${token}`
        // or "X-Auth-Token": token
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("STOMP connected");
        setConnected(true);

        // Subscribe to a topic your backend sends notifications to
        // client.subscribe("/topic/notifications", (message) => {
        //   const body = JSON.parse(message.body);
        //   setMessages((prev) => [...prev, body]);
        // });

        // Optional: send an initial handshake message to backend
        // if you have a @MessageMapping("/handshake") on server
        // client.publish({
        //   destination: "/app/handshake",
        //   body: JSON.stringify({ msg: "hello from frontend" }),
        // });
      },
      onStompError: (frame) => {
        console.error("Broker reported error", frame.headers["message"]);
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
  }, [token]);

  return (
    <div>
      <h3>WebSocket Notifications</h3>
      <p>Status: {connected ? "Connected" : "Disconnected"}</p>
      {/* <ul> */}
        {/* {messages.map((m, i) => (
          <li key={i}>{JSON.stringify(m)}</li>
        ))}
      </ul> */}
    </div>
  );
}