import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const contractAddress = "0x23dcB293c28d6587dC2D0ACd77b7C8C0f322734f";
/* global BigInt */


export default function VouchNewProject() {
  const [address, setAddress] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Vouch for new project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2 font-extrabold text-xl">
            Vouch new project
          </DialogTitle>
          <blockquote className=" border-l-2 pl-6 italic">
            You need to submit <b>0.02 ETH</b> for security purpose (as a
            stake).
          </blockquote>
        </DialogHeader>

        <p className="font-semibold text-md mt-4 mb-[-16px]">Gas Data</p>
        <p className="text-muted-foreground">Sepolia testnet</p>

        <p className="text-muted-foreground mb-[-10px]">
          Fastest: <span className="text-white font-bold">0005 gwei</span>
        </p>
        <p className="text-muted-foreground mb-[-10px]">
          Average: <span className="text-white font-bold">0005 gwei</span>
        </p>
        <p className="text-muted-foreground mb-[-10px]">
          Slowest: <span className="text-white font-bold">0005 gwei</span>
        </p>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Address
            </Label>
            <Input
              id="username"
              placeholder="The address you want to vouch for.."
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button">
            Stake 0.02 ETH
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
