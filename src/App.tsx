import './App.css'
import SignIn from './pages/SignIn/SignIn'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import PublicLayout from './pages/PublicLayout/PublicLayout'
import AuthorizedLayout from './pages/AuthorizedLayout/AuthorizedLayout'
import NotFound from './pages/NotFound/NotFound'
import { isAuthorized } from './utils/session'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthorized() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route element={<PublicLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
        <Route element={<AuthorizedLayout />}>
          <Route
            path="/dashboard"
            element={
              isAuthorized() ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  )
}

export default App
