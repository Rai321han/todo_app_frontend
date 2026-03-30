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
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#a8edcb] via-[#d4f5a0] to-[#f0e68c] font-['DM_Sans','Segoe_UI',sans-serif]">
      <AuthForm mode={mode} onSwitch={handleModeChange} />
    </div>
  );
}
