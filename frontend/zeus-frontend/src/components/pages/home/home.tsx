import { useNavigate } from "react-router-dom";
import { MetaMaskButton, useAccount } from "@metamask/sdk-react-ui";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  if (isConnected) {
    navigate("/dashboard");
  }

  return (
    <>
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Welcome to
        </h1>
        <div className="max-md:text-6xl text-9xl drop-shadow-2xl logo">⚡</div>
        <h1 className="mb-4 text-6xl drop-shadow-2xl bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-extrabold leading-none tracking-tight md:text-6xl lg:text-9xl">
          Zeus
        </h1>
        <p className="text-xl mb-8 font-semibold text-orange-100 lg:text-2xl">
          You credit score. Simplified.{" "}
          <span className="underline underline-offset-2 decoration-2 decoration-blue-400 dark:decoration-blue-600 lg:decoration-4">
            Blazingly Fast.
          </span>
        </p>
        <MetaMaskButton theme="dark" color="white"></MetaMaskButton>
      </div>
    </>
  );
}
