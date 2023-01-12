import "./App.css";
import Sidebar from "./component/Sidebar";
import Chat from "./component/Chat";
import Login from "./component/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    // BEM naming convention
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path='/rooms/:roomId' element={<Chat />} />
              <Route path='/' element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
