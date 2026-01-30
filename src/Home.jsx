import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
   const [data, setData] = useState(null);

  useEffect(() => {

    axios.get("http://localhost:8083/api/v1/notification/getString", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjE2IiwiaWF0IjoxNzY5NTk0MTIyLCJleHAiOjE3Njk2MTIxMjIsInJlc291cmNlSWQiOjQxMjMxNDQ3MDQsInR5cGUiOiJBQ0NFU1MiLCJ1c2VySWQiOjQxMjMxNDQ3MDQsInNzbyI6IiIsInVzZXJuYW1lIjoiYWRtaW4xNiIsInNpZCI6MTYsImNvcnBvcmF0ZUlkIjoxLCJ0aW1lc3RhbXAiOjE3Njk1OTQxMjI0Mjl9.QItL6KIMBvH7lFcFtUJX_tbmul8RRt4EfhgQwBcZO20`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setData(response.data);
      console.log(data);
      
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
}