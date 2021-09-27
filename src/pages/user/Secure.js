import { useEffect, useState } from "react"
import { useHistory } from "react-router"

export default function Secure() {
  const [users, setUsers] = useState([])

  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) history.push("/signin")

    fetch("http://localhost:3030/users", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const users = data.users

        console.log("Users GET request: ", data)

        setUsers(users)
      })
      .catch(error => {
        console.error("[ERROR]: ", error)

        // history.push("/signin")
      })
  }, [])

  return (
    <main>
      <h1>Secure</h1>
      <p>The list of users is protected by the server.</p>
      <ul>
        {users.map((user, index) => {
          return <li key={index}>{user.email}</li>
        })}
      </ul>
    </main>
  )
}
