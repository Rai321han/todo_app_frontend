import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Nav() {
  const { user, isAuthenticated, signOut } = useAuth();
  return (
    <nav className="bg-gray-100/30 flex flex-row items-center justify-between p-4 border-b border-gray-300">
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
          <button onClick={() => signOut()} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
}
