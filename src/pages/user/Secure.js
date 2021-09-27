import { useEffect, useState } from "react"
import { useHistory } from "react-router"

export default function Secure() {
  const [posts, setPosts] = useState([])

  const history = useHistory()

  useEffect(() => {
    const userAsJSON = localStorage.getItem("user")

    const user = JSON.parse(userAsJSON)

    if (!user) history.push("/signin")

    fetch("http://localhost:3030/posts", {
      method: "GET",
      headers: {
        authorization: user.id,
      },
    })
      .then(res => res.json())
      .then(data => {
        const posts = data.posts

        console.log("Users GET request: ", data)

        setPosts(posts)
      })
      .catch(error => {
        console.error("[ERROR]: ", error)

        // history.push("/signin")
      })
  }, [])

  return (
    <main>
      <h1>Secure</h1>
      <p>
        The list of posts belong to the authenticated user and are protected by
        the server.
      </p>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post.body}</li>
        })}
      </ul>
    </main>
  )
}
