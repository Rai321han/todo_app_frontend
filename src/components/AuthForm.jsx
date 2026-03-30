import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { replace, useNavigate } from "react-router";

function InputField({ label, type = "text", value, onChange, right }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`input-field${right ? " has-right" : ""}`}
        />
        {right && <span className="input-right">{right}</span>}
      </div>
    </div>
  );
}

function AuthForm({ mode, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { signIn, signUp, loading, error, isAuthenticated } = useAuth();
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setAuthError(error);
    }
  }, [error]);

  const isSignUp = mode === "signup";

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignUp) {
      signUp(username, email, password);
    } else {
      signIn(email, password);
    }
  }

  const eyeIcon = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: showPass ? 1 : 0.5 }}
      onClick={() => setShowPass((v) => !v)}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
      {!showPass && <line x1="1" y1="1" x2="23" y2="23" />}
    </svg>
  );

  return (
    // <div className="auth-page">
    <div className="auth-card">
      {/* Tab Toggle */}
      <div className="auth-tabs">
        {["signin", "signup"].map((m) => (
          <button
            key={m}
            onClick={() => onSwitch(m)}
            className={`auth-tab${mode === m ? " active" : ""}`}
          >
            {m === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Fields */}
      {isSignUp && (
        <InputField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Password"
        type={showPass ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        right={eyeIcon}
      />
      <div>{authError && <p>{authError}</p>}</div>

      {/* Submit */}
      <button onClick={(e) => handleSubmit(e)} className={`auth-btn`}>
        {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
      </button>

      {/* Switcher hint */}
      <p className="auth-hint">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          className="auth-hint-link"
          onClick={() => onSwitch(isSignUp ? "signin" : "signup")}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
    /* </div> */
  );
}

export default function App() {
  const [mode, setMode] = useState("signin");
  return <AuthForm mode={mode} onSwitch={setMode} />;
}
