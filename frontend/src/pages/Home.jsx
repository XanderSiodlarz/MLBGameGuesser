import { useState } from 'react';
//import AutoDropdown from "./components/AutoDropdown.jsx";
//import Debounce from "./components/Debounce.jsx"
//import './App.css'
//<AutoDropdown options = {players} />
import { SignupButton, LoginButton } from "../components/AuthenticateButton.jsx"
function Home() {
  

  return (
      <div>
        <SignupButton />
        <LoginButton />
      </div>
  )
}

export default Home
