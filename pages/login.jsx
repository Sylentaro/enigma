import { useState } from "react"

const getStaticProps = async () => {
    
    return {
        props: ""
    }
}

async function handleSubmit() { 
  await fetch("/api/login")
}

const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    
    return (
        <form onSubmit={handleSubmit}>
          {/* {error && <p>{error}</p>} */}
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <label htmlFor="password"> Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <button type="submit">Zaloguj</button>
        </form>
      )
}
export default LoginForm