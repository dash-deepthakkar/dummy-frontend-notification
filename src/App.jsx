import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
// import Cookies from "js-cookie";
import { useEffect } from "react";
import NotificationStompClient from './NotificationStompClient';
import { Login } from './Login';
import { Home } from './Home';

// export const AUTH_TOKEN =
//   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjE3IiwiaW0IjoxNzcwMDk4NjM0LCJleHAiOjE3NzAxMTY2MzQsInR5cGUiOiJBQ0NFU1MiLCJ1c2VySWQiOjQxMjMzMjA0NzksInVzZXJuYW1lIjoiYWRtaW4xNyJ9.xxx";

function App() {

  useEffect(() => {
    
    // Cookies.set("AUTH_TOKEN", AUTH_TOKEN, {
    //   expires: 5,
    //   path: "/",       
    //   sameSite: "lax",
    //   secure: false,
    // });

    // console.log("Cookie now:", Cookies.get("AUTH_TOKEN"));
  }, []);

  return (
    <Routes>
        <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
      <Route path='/notification' element={<NotificationStompClient />} />
     
      
      
       
    
    </Routes>
  );
}

export default App;
