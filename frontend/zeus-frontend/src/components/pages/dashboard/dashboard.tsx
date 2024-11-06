import { useAccount } from "@metamask/sdk-react-ui";
import { useNavigate } from "react-router-dom";
import Nav from "@/components/custom/nav";
import { CreditScoreCard } from "@/components/custom/credit-score";
import TaskGroup from "@/components/custom/task-group";
import "./dashboard.css";

export default function Dashboard() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  if (!isConnected) {
    navigate("/");
  }

  return (
    <>
      <Nav />
      <div className="flex flex-row justify-center">
        <CreditScoreCard />
      </div>
      <TaskGroup />
    </>
  );
}
