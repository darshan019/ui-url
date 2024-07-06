import { useState } from "react"
import { useToken, useUser } from "./TokenAndUser"
import { useNavigate } from "react-router-dom"

export default function Shorten() {
  const [url, setUrl] = useState("")

  function handleInputChange(event) {
    setUrl(event.target.value)
  }

  const token = useToken()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    await fetch("http://localhost:8080/encode", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"long_url": url})
    })
    console.log(JSON.stringify({"long_url": url}))
    navigate("/")
  }

  return (
    <div className="container-fluid w-50 mt-4">
      {useUser() != null ? (
        <form className="container-fluid m-3 p-5" onSubmit={handleSubmit} method="post" action="">
      
        <div className="form-group m-2">
          <label htmlFor="longurl">Link</label>
          <input onChange={handleInputChange} className="form-control" type="text" name="long_url" id="longurl" />
        </div>
        <button type="submit" className="m-2 btn btn-primary form-control">
          Shorten
        </button>
      </form>
      ) : (
        <h1>You need to be logged in to shorten url</h1>
      )}
    </div>
  )
}