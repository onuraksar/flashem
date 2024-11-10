import './App.css'
import SignIn from './pages/SignIn/SignIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        {/* todo: might add a notfound page here */}
        <Route />
      </Routes>
    </Router>
  )
}

export default App
