import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function CreditScoreTest() {
  const [data, setData] = useState("Hello world!");
  const wallet = useWalletStore();
  console.log(wallet.address);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Credit score</CardTitle>
        <CardDescription>Check your credit score here</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="walletAddress">Wallet address</Label>
              <Input id="walletAddress" placeholder="Your wallet address" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button>Calculate</Button>
        <Textarea placeholder="Type your message here." value={data} />
      </CardFooter>
    </Card>
  );
}
