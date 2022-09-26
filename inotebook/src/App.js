import React, { useState } from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';

import Home from './components/Home';
import NoteState from './context/notes/NotesState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';


function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>

      <NoteState>
        <BrowserRouter>

          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route index element={<Home showAlert={showAlert} />} />

            <Route path='/login' element={<Login showAlert={showAlert} />}></Route>
            <Route path='/signup' element={<Signup showAlert={showAlert} />}></Route>

          </Routes>

        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App;
