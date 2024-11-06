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

export default function BorrowMoney() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="w-full">Borrow Money 💸</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2 font-extrabold text-xl">
            Initiate Borrow request
          </DialogTitle>
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
          <Button type="submit">Stake </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
