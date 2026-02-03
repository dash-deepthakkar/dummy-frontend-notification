import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


export const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjE3IiwiaWF0IjoxNzcwMDk4NjM0LCJleHAiOjE3NzAxMTY2MzQsInJlc291cmNlSWQiOjQxMjMzMjA0NzksInR5cGUiOiJBQ0NFU1MiLCJ1c2VySWQiOjQxMjMzMjA0NzksInNzbyI6IiIsInVzZXJuYW1lIjoiYWRtaW4xNyIsInNpZCI6MTcsImNvcnBvcmF0ZUlkIjoxLCJ0aW1lc3RhbXAiOjE3NzAwOTg2MzQ5MDh9.rD-6l1rs0CtDUEmOCsyheaidq7ZHPgc6pvHvU6GotBE";

export const Home = () => {
  const [data, setData] = useState(null);

 useEffect(() => {
  // store token
  // localStorage.setItem("AUTH_TOKEN", AUTH_TOKEN);


  axios.get("http://localhost:8083/api/v1/notification/getString", {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    setData(response.data);
  })
  .catch(error => {
    console.error("API error:", error);
  });
}, []);


  return (
    <div className="container mt-4">
      <h3>Dashboard</h3>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
};
