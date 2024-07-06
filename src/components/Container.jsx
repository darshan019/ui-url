import { useEffect, useState } from "react";
import { useToken, useUser } from "./TokenAndUser";

export function Container() {
  const [urls, setUrls] = useState([])
  
  let accessToken = useToken()
  let user = useUser()

  useEffect(() => {
    async function fetchURLS() {
      await fetch("http://localhost:8080/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken != null ? accessToken : "n"}`,
        } 
      })
        .then(async res => {
          let data = await res.json()
          console.log(data)
          setUrls(data.Urls)
        })
    }
    fetchURLS()
  }, [accessToken])

  async function onDelete(shortUrl) {
    console.log("deleting")
    let res = await fetch("http://localhost:8080/url/delete", {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"short": shortUrl})
    })

    if(!res.ok) {
      console.log("An error occurred")
    }
    setUrls(prev => prev.filter(url => url.short != shortUrl))
    console.log(urls)
  }

  return (
    <div className="container mt-5 flex-column justify-content-center d-flex ">
      <h1 className="text-center">Hello {user ? user.username : "guest"}</h1>
      {urls && urls.length > 0 ? (
        urls.map((url, index) => (
          <div className="container-fluid mt-3" key={index}>
            <Display url={url} onDelete={onDelete}/>
          </div>
        ))
      ) : (
        <h1 className="text-center text-muted mt-5">Nothing here...</h1>
      )}
    </div>
  )

}

// eslint-disable-next-line react/prop-types
function Display({ url, onDelete }) {
  // eslint-disable-next-line react/prop-types
  const arr = url.split(" ")

  // let accessToken = useToken()

  // async function onDelete(shortUrl, longUrl) {
  //   console.log("deleting")
  //   let res = await fetch("http://localhost:8080/url/delete", {
  //     method: "DELETE",
  //     headers: {
  //       "Authorization": `Bearer ${accessToken}`,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({"short": shortUrl, "long": longUrl})
  //   })

  //   if(!res.ok) {
  //     console.log("An error occurred")
  //   }
  // }

  return (
    <div className="card m-3">
      <div className="card-body">
        <p className="card-text">
          <strong>Short URL: </strong>
          <a href={arr[1]} target="_blank" rel="noopener noreferrer">{arr[1]}</a>
        </p>
        <p className="card-text">
          <strong>Long URL: </strong>
          <a href={arr[3]} target="_blank" rel="noopener noreferrer">{arr[3]}</a>
        </p>
        <button onClick={() => onDelete(arr[1])} className="btn btn-primary">DELETE</button>
      </div>
    </div>
  );
}