import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddNotes from './pages/AddNotes'
import DashBoard from './pages/DashBoard'
import EditNotes from './pages/EditNotes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'

function App() {
  const [userNotes, setUserNotes] = useState([])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <DashBoard/> } ></Route>
          <Route path="/login" element={ <Login/> } ></Route>
          <Route path="/signup" element={ <Signup/> } ></Route>
          <Route path="/user" element={ <User
            userNotes={userNotes}
            setUserNotes={setUserNotes} /> } >
          </Route>
          <Route path="/addnotes" element={ <AddNotes
            userNotes={userNotes}
            setUserNotes={setUserNotes}/> } >
          </Route>
          <Route path="/edit/:id" element={ <EditNotes
            userNotes={userNotes}
            setUserNotes={setUserNotes}/> } >             
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
