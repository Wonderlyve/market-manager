
import { useState } from "react";
import { Client, ClientTable } from "@/components/clients/ClientTable";
import { ClientDetails } from "@/components/clients/ClientDetails";

// Données fictives
const initialClients: Client[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    cardId: "CL-1001",
    monthlySpendings: 180.50,
    remainingBudget: 119.50,
    loyaltyPoints: 120
  },
  {
    id: "2",
    name: "Marie Lambert",
    email: "marie.lambert@example.com",
    cardId: "CL-1002",
    monthlySpendings: 75.20,
    remainingBudget: 224.80,
    loyaltyPoints: 45
  },
  {
    id: "3",
    name: "Théo Martin",
    email: "theo.martin@example.com",
    cardId: "CL-1003",
    monthlySpendings: 290.15,
    remainingBudget: 9.85,
    loyaltyPoints: 290
  },
  {
    id: "4",
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    cardId: "CL-1004",
    monthlySpendings: 145.30,
    remainingBudget: 154.70,
    loyaltyPoints: 85
  },
  {
    id: "5",
    name: "Lucas Petit",
    email: "lucas.petit@example.com",
    cardId: "CL-1005",
    monthlySpendings: 210.75,
    remainingBudget: 89.25,
    loyaltyPoints: 175
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
  const [clients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <p className="text-gray-500">Gérer les informations client et suivre leurs achats et points de fidélité</p>
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
    </div>
  );
};

export default Clients;
