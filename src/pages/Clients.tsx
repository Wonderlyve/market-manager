
import { useState } from "react";
import { Client, ClientTable } from "@/components/clients/ClientTable";
import { ClientDetails } from "@/components/clients/ClientDetails";
import { ClientForm } from "@/components/clients/ClientForm";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

// Données fictives
const initialClients: Client[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    cardId: "CL-1001",
    monthlySpendings: 180.50,
    remainingBudget: 119.50,
    loyaltyPoints: 120,
    firstName: "Jean",
    lastName: "Dupont",
    civilStatus: "married",
    gender: "male",
    address: "15 rue des Lilas, 75001 Paris"
  },
  {
    id: "2",
    name: "Marie Lambert",
    email: "marie.lambert@example.com",
    cardId: "CL-1002",
    monthlySpendings: 75.20,
    remainingBudget: 224.80,
    loyaltyPoints: 45,
    firstName: "Marie",
    lastName: "Lambert",
    civilStatus: "single",
    gender: "female",
    address: "42 avenue Victor Hugo, 75016 Paris"
  },
  {
    id: "3",
    name: "Théo Martin",
    email: "theo.martin@example.com",
    cardId: "CL-1003",
    monthlySpendings: 290.15,
    remainingBudget: 9.85,
    loyaltyPoints: 290,
    firstName: "Théo",
    lastName: "Martin",
    civilStatus: "single",
    gender: "male",
    address: "7 boulevard Haussmann, 75009 Paris"
  },
  {
    id: "4",
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    cardId: "CL-1004",
    monthlySpendings: 145.30,
    remainingBudget: 154.70,
    loyaltyPoints: 85,
    firstName: "Sophie",
    lastName: "Bernard",
    civilStatus: "divorced",
    gender: "female",
    address: "22 rue de Rivoli, 75004 Paris"
  },
  {
    id: "5",
    name: "Lucas Petit",
    email: "lucas.petit@example.com",
    cardId: "CL-1005",
    monthlySpendings: 210.75,
    remainingBudget: 89.25,
    loyaltyPoints: 175,
    firstName: "Lucas",
    lastName: "Petit",
    civilStatus: "married",
    gender: "male",
    address: "3 place de la Concorde, 75008 Paris"
  }
];

// Historique fictif des achats
const purchaseHistory = [
  {
    id: "p1",
    date: "12/05/2025",
    amount: 45.80,
    items: 8
  },
  {
    id: "p2",
    date: "08/05/2025",
    amount: 32.15,
    items: 5
  },
  {
    id: "p3",
    date: "01/05/2025",
    amount: 78.90,
    items: 12
  },
  {
    id: "p4",
    date: "25/04/2025",
    amount: 23.65,
    items: 4
  }
];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddClient = (clientData: Omit<Client, "id" | "monthlySpendings" | "remainingBudget" | "loyaltyPoints">) => {
    // Générer un nouvel ID en prenant le dernier ID et en l'incrémentant
    const nextId = (parseInt(clients[clients.length - 1].id) + 1).toString();
    
    // Créer le nouveau client avec des valeurs par défaut pour les dépenses et points
    const newClient: Client = {
      ...clientData,
      id: nextId,
      monthlySpendings: 0,
      remainingBudget: 300,
      loyaltyPoints: 0
    };
    
    // Ajouter le client à la liste
    setClients([...clients, newClient]);
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-500">Gérer les informations client et suivre leurs achats et points de fidélité</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Nouveau Client
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className={`${selectedClient ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <ClientTable 
            clients={clients} 
            onSelectClient={setSelectedClient} 
          />
        </div>
        
        {selectedClient && (
          <div>
            <ClientDetails 
              client={selectedClient}
              purchaseHistory={purchaseHistory}
            />
          </div>
        )}
      </div>
      
      <ClientForm 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSubmit={handleAddClient}
      />
    </div>
  );
};

export default Clients;
