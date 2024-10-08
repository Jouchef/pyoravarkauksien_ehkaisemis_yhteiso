import { useState } from "react"
import { auth, provider } from "../services/google_authentication"
import { getRedirectResult, onAuthStateChanged, signInWithRedirect, User } from "firebase/auth"
import { Navigate } from "react-router-dom"

const Login = () => {
  const [user, setUser] = useState<User | null>(null)
  console.log(user)

  getRedirectResult(auth)
  .then((result) => {
    if (result) {
      setUser(result.user)
    }
  }).catch((error) => {
    console.error(error)
  })

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  return (
    <div>
      {
        user
          ? <Navigate replace to="/" />
          : <button onClick={() => signInWithRedirect(auth, provider)}>Google</button>
      }
    </div>
  )
}

export default Login