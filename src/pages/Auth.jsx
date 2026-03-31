import AuthForm from "../components/AuthForm";
import { useSearchParams } from "react-router";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const modeFromQuery = searchParams.get("mode");
  const mode = modeFromQuery === "signup" ? "signup" : "signin";

  const handleModeChange = (nextMode) => {
    setSearchParams({ mode: nextMode });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 ">
      <AuthForm key={mode} mode={mode} onSwitch={handleModeChange} />
    </div>
  );
}
