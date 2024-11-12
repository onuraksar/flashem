import './App.css'
import SignIn from './pages/SignIn/SignIn'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* todo: redirect to dashboard if signed in */}
        <Route
          path="/"
          element={<Navigate to="/signin" replace />}
        />

        {/* todo: might add a notfound page here */}
        <Route />
      </Routes>
    </Router>
  )
}

export default App
