import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import VouchedProjectsTable from "./table";

export default function ViewVouchedProjects() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={"outline"}>View Vouched Projects</Button>
      </DrawerTrigger>
      <DrawerContent>
        <VouchedProjectsTable />
        
      </DrawerContent>
    </Drawer>
  );
}
