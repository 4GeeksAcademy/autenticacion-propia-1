import React,{useState} from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
 export const Signup = () => {
    const {actions} = useContext(Context)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSignUp = (e) => {
        e.preventDefault()
        actions.signUp(name,email,password)
    }
    return(
        <div className="flex items-center justify-center h-screen">
      <div className="w-96 shadow-lg p-6">
          <div className="text-center text-2xl font-bold">Signup</div>
        <div>
          <form onSubmit={handleSignUp}  className="space-y-4">
            <input
              type="name"
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