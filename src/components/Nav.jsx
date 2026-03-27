import { Link } from "react-router";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/login"}>Login</Link>
    </nav>
  );
}
