import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false); // true on initial load
  const [bootLoading, setBootLoading] = useState(true); // ONLY for /me
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch current user on app load
  const fetchUser = useCallback(async () => {
    setBootLoading(true);
    try {
      const res = await api.get("/auth/me"); // backend reads accessToken cookie
      setUser({
        id: res.data.id,
        username: res.data.username,
      });
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setBootLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // SignIn
  const signIn = useCallback(
    async (email, password, redirect) => {
      setLoading(true);
      try {
        await api.post("/auth/login", { email, password });
        await fetchUser();
        if (redirect) {
          navigate(redirect, { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    },
    [fetchUser]
  );

  // SignUp
  const signUp = useCallback(async (username, email, password) => {
    setLoading(true);
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });
      navigate("/auth?mode=signin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // SignOut
  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      navigate("/auth?mode=signin", { replace: true });
    } catch {}
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    setLoading(false);
  }, []);

  if (bootLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-300" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, error, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
