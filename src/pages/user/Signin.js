import { useState } from "react"
import { useHistory } from "react-router"

import jwtDecode from "jwt-decode"

export default function Signin(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const { setAuthenticatedUser } = props

  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
    }

    fetch("http://localhost:3030/signin", fetchOptions)
      .then(res => {
        if (res.status === 401) {
          throw Error(res.statusText)
        }

        return res.json()
      })
      .then(data => {
        const token = data.token

        console.log("Inside Signin Fetch: ", { token })

        if (token) {
          localStorage.setItem("token", token)

          const user = jwtDecode(token)

          console.log("Inside Signin Fetch: ", { user })

          setAuthenticatedUser(user)

          history.push("/secure")
        }
      })
      .catch(error => {
        console.error("[ERROR]: ", error)
      })
  }

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value

    setUser({ ...user, [name]: value })
  }

  return (
    <main>
      <form className="form-stack" onSubmit={handleSubmit}>
        <h2>User Sign In</h2>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </main>
  )
}
