import { Button } from "../ui/button";
import { useAccount, useDisconnect } from "@metamask/sdk-react-ui";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  return (
    <nav
      className="bg-transparent backdrop-blur-md fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center text-3xl space-x-3 rtl:space-x-reverse"
        >
          ⚡
          <span className="self-center ml-1 text-2xl font-bold whitespace-nowrap dark:text-white">
            Zeus
          </span>
        </a>
        <div className="flex flex-row space-x-1.5">
          <span className="text-base font-semibold text-gray-600 dark:text-gray-400">
            Wallet address:
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            {address}
          </span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Button
            variant={"secondary"}
            onClick={() => {
              disconnect();
              navigate("/");
            }}
          >
            Disconnect
          </Button>
        </div>
      </div>
    </nav>
  );
}
