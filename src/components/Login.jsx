import { useState } from "react"
import { useTokenUpdate, useUserUpdate } from "./TokenAndUser"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [formData, setFormData] = useState({username: "", email: "", password: ""})
  
  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const nav = useNavigate()
  const setToken = useTokenUpdate()
  const setUser = useUserUpdate()

  async function handleSubmit(event) {
    event.preventDefault()

    await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if(!res.ok) throw new Error("Error logging in")
        return res.json()
      }).then(data => {
        console.log(data)
        if(setToken) setToken(data.access_token)
        setUser(data)
      })
    nav("/")
  }

  return (
    <div className="container-fluid w-50 mt-4">
    <form onSubmit={handleSubmit} className="container-fluid m-3 p-5" method="post" action="">
      
      <div className="form-group m-2">
        <label htmlFor="name">Username</label>
        <input onChange={handleInputChange} className="form-control" type="text" name="username" id="name" />
      </div>
      <div className="form-group m-2">
        <label htmlFor="mail">Email Address</label>
        <input onChange={handleInputChange} className="form-control" type="email" name="email" id="mail" />
      </div>
      <div className="form-group m-2">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          onChange={handleInputChange}
          id="password"
        />
      </div>
      <button type="submit" className="m-2 btn btn-primary form-control">
        Login
      </button>
    </form>
    </div>
  )
}