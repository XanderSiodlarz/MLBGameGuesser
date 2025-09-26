import { useState } from 'react';
//import AutoDropdown from "./components/AutoDropdown.jsx";
//import Debounce from "./components/Debounce.jsx"
//import './App.css'
//<AutoDropdown options = {players} />
import Gameday from "./pages/Gameday.jsx"
import Home from "./pages/Home.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Game from "./pages/Game.jsx"
import { AuthProvider } from "./AuthContext.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Pick from "./pages/Pick.jsx"
import PickHistory from "./pages/PickHistory.jsx"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gameday/:date" element={
            <ProtectedRoute>
              <Gameday />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/pick-history" element={
            <ProtectedRoute>
              <PickHistory />
            </ProtectedRoute>
          } />
          <Route path="/game" element={<Game />} />
          <Route path="/pick" element={<Pick />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
