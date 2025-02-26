import React, {useState} from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
 export const Login = () => {
    const {actions} = useContext(Context)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
     const handleLogIn = (e) => {
        e.preventDefault()
        actions.logIn(name, email, password, navigate)
     }
    return(
        <div className="flex items-center justify-center h-screen">
      <div className="w-96 shadow-lg p-6">
          <div className="text-center text-2xl font-bold">Login</div>
        <div>
          <form onSubmit={handleLogIn}  className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white bg-primary">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
    )
}