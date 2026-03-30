import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Nav() {
  const { user, isAuthenticated } = useAuth();
  return (
    <nav className="nav">
      <div className="nav-user">
        {user && (
          <span>
            Hello, <strong>{user.username}</strong> !
          </span>
        )}
      </div>
      <div className="nav-links">
        <Link to={"/dashboard"}>Dashboard</Link>
        {isAuthenticated ? (
          <button onClick={() => logout()} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
}
