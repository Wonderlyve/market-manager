
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { ClientRegistrationForm } from "./ClientRegistrationForm";

export function ClientRegistrationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Nouveau client</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enregistrement d'un nouveau client</DialogTitle>
        </DialogHeader>
        <ClientRegistrationForm />
      </DialogContent>
    </Dialog>
  );
}
