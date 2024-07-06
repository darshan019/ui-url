import { Link } from "react-router-dom";
import { useUser } from "./TokenAndUser";

export default function Navigation() {
  const user = useUser()
  return (
    <div
      className="d-flex justify-content-around align-items-center container-fluid bg-dark-subtle p-3"
    >
      <h1 className="fw-bold">ShortURL</h1>
      <ul className="d-flex list-unstyled mb-0">
        {user ? (
          <li className="ms-3">
          <Link to="/shorten" className="fs-5 text-decoration-none">Shorten URL</Link>
        </li>
        ) : (
          <>
          <li className="ms-3">
          <Link to="/login" className="fs-5 text-decoration-none">Login</Link>
        </li>
        <li className="ms-3">
          <Link to="signup" className="fs-5 text-decoration-none">Signup</Link>
        </li>
        </>
        )}
        
      </ul>
    </div>
  )
}