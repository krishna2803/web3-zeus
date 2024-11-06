import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import ViewVouchedProjects from "./viewVouchedProjects"
import VouchNewProject from "./newProject"

export function VouchChoiceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">Vouch 👍</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle>What do you want to do?</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4">
          <VouchNewProject />
          <ViewVouchedProjects />
        </div>
      </DialogContent>
    </Dialog>
  )
}
