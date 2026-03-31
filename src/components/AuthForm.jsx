import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

function InputField({ label, type = "text", value, onChange, right, name }) {
  return (
    <div className="relative mb-6">
      <label className="mb-1 block text-[12px] tracking-[0.03em] text-slate-400">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          className={`w-full border-0 border-b-[1.5px] border-slate-300 bg-transparent py-2 text-sm text-slate-700 outline-none transition-colors focus:border-b-[#2ec4a9] ${
            right ? "pr-8" : ""
          }`}
        />
        {right && (
          <span className="absolute right-0 top-1/2 flex -translate-y-1/2 cursor-pointer items-center text-slate-400">
            {right}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AuthForm({ mode, onSwitch }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

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
    setFormData({
      email: "",
      password: "",
      username: "",
    });
    setAuthError(null);
  }, [mode]);

  useEffect(() => {
    if (error) {
      setAuthError(error);
    }
  }, [error]);

  const isSignUp = mode === "signup";

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignUp) {
      signUp(formData.username, formData.email, formData.password);
    } else {
      signIn(formData.email, formData.password, "/dashboard");
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
    <div className="w-[320px] rounded-3xl bg-white px-9 pb-9 pt-10 shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
      <div className="mb-8 inline-flex gap-0.5 rounded-full bg-emerald-50 p-1">
        {["signin", "signup"].map((m) => (
          <button
            key={m}
            onClick={() => onSwitch(m)}
            className={`rounded-full px-5 py-1.75 text-[13.5px] tracking-[0.01em] transition-all ${
              mode === m
                ? "bg-[#2ec4a9] font-semibold text-white"
                : "bg-transparent font-normal text-slate-500"
            }`}
          >
            {m === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Fields */}
      {isSignUp && (
        <InputField
          label="Username"
          value={formData.username}
          onChange={(e) => handleOnChange(e)}
          name="username"
        />
      )}
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleOnChange(e)}
        name="email"
      />
      <InputField
        label="Password"
        type={showPass ? "text" : "password"}
        value={formData.password}
        onChange={(e) => handleOnChange(e)}
        name="password"
        right={eyeIcon}
      />
      <div>
        {authError && <p className="text-sm text-rose-500">{authError}</p>}
      </div>

      <button
        onClick={(e) => handleSubmit(e)}
        className="mt-1 w-full rounded-[10px] bg-linear-to-r from-[#2ec4a9] to-[#38d9a9] px-3 py-3.25 text-[15px] font-semibold tracking-[0.02em] text-white shadow-[0_2px_12px_rgba(46,196,169,0.25)] transition-all hover:-translate-y-px hover:opacity-90 hover:shadow-[0_4px_16px_rgba(46,196,169,0.35)]"
      >
        {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
      </button>

      <p className="mt-5 text-center text-[13px] text-slate-400">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          className="cursor-pointer font-semibold text-[#2ec4a9] hover:underline"
          onClick={() => onSwitch(isSignUp ? "signin" : "signup")}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
}
