import { useEffect, useState } from "react"
import { Redirect, Route, Switch } from "react-router"

import jwtDecode from "jwt-decode"

import Header from "./components/Header"
import Home from "./Home"
import Secure from "./Secure"
import Signin from "./Signin"
import Signup from "./Signup"

export default function Router() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  console.log("User Router: ", { authenticatedUser })

  useEffect(() => {
    if (authenticatedUser) return

    const token = localStorage.getItem("token")

    if (token) {
      const user = jwtDecode(token)

      setAuthenticatedUser(user)
    }
  }, [authenticatedUser])

  const handleLogout = () => {
    localStorage.removeItem("token")

    setAuthenticatedUser(null)
  }

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Switch>
        <Route path="/signup">
          <Signup setAuthenticatedUser={setAuthenticatedUser} />
        </Route>
        <Route path="/signin">
          <Signin setAuthenticatedUser={setAuthenticatedUser} />
        </Route>
        <Route path="/secure">
          {authenticatedUser ? <Secure /> : <Redirect to="/signin" />}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  )
}
