import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AuthContext from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    setBootLoading(true);

    try {
      const res = await api.get("/auth/me");
      setUser({
        id: res.data.id,
        username: res.data.username,
      });
      setIsAuthenticated(true);
      setError(null);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setBootLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const signIn = useCallback(
    async (email, password, redirect) => {
      setLoading(true);
      setError(null);

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
    [fetchUser, navigate]
  );

  const signUp = useCallback(
    async (username, email, password) => {
      setLoading(true);
      setError(null);

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
    },
    [navigate]
  );

  const signOut = useCallback(async () => {
    setLoading(true);

    try {
      await api.post("/auth/logout");
      navigate("/auth?mode=signin", { replace: true });
    } catch {
      // No-op: we still clear client auth state below.
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      setLoading(false);
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      bootLoading,
      error,
      signIn,
      signUp,
      signOut,
    }),
    [
      user,
      isAuthenticated,
      loading,
      bootLoading,
      error,
      signIn,
      signUp,
      signOut,
    ]
  );

  if (bootLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-300" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
