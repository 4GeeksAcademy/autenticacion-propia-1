 import React,{useEffect, useState} from "react";
 import { Navigate, useNavigate } from "react-router-dom";
 import { useContext } from "react";
 import { Context } from "../store/appContext";

 export const Privada = () => {
   const {actions,store} = useContext(Context)
   const [loggedIn, setLoggedIn] = useState(false)
   const navigate = useNavigate()
    const handleLogOut = () => {
      actions.logOut(navigate)
    }

   useEffect(() => {
      const token = localStorage.getItem("token")
      if (token){
         setLoggedIn(true)
      } else{
         setLoggedIn(false)
      }
      actions.getProfile()
   }, [])

   useEffect(() => {
      console.log(store.user);
   }, [store.user])

   useEffect(() => {
      if (localStorage.getItem("token") === null){
         navigate("/")
      }

   }, [])

    return(
        <div className="card text-center d-flex justify-content-center align-items-center mt-5">
     <div className="card border-dark mb-3" style={{ maxwidth: "18rem"}}>
  <div className="card-header bg-transparent border-dark">bienvenido {store.user?.name}</div>
  <div className="card-body text-dark">
    <ul>
      <li>Nombre: {store.user?.name}</li>
      <li>Email: {store.user?.email}</li>
      <li>Id: {store.user?.id}</li>
    </ul>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <button  onClick={handleLogOut} className="btn-primary">Log Out</button>
</div>
</div>
    )
 }