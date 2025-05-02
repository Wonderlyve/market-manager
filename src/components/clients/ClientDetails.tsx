
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Client } from "./ClientTable";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GiftIcon, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseHistory {
  id: string;
  date: string;
  amount: number;
  items: number;
}

interface ClientDetailsProps {
  client: Client;
  purchaseHistory: PurchaseHistory[];
}

export function ClientDetails({ client, purchaseHistory }: ClientDetailsProps) {
  const { toast } = useToast();
  const [currentClient, setCurrentClient] = useState<Client>(client);
  
  const monthlySpendingData = [
    { name: "Jan", amount: 120 },
    { name: "Fév", amount: 140 },
    { name: "Mars", amount: 180 },
    { name: "Avr", amount: 200 },
    { name: "Mai", amount: 150 },
    { name: "Juin", amount: 220 },
  ];

  const budgetPercentage = (currentClient.monthlySpendings / 300) * 100;

  const handleAddLoyaltyPoints = (points: number) => {
    const updatedClient = { 
      ...currentClient, 
      loyaltyPoints: currentClient.loyaltyPoints + points 
    };
    setCurrentClient(updatedClient);
    toast({
      title: "Points ajoutés",
      description: `${points} points de fidélité ajoutés avec succès.`
    });
  };

  const handleRedeemPoints = (points: number, reward: string) => {
    if (currentClient.loyaltyPoints < points) {
      toast({
        title: "Points insuffisants",
        description: `Le client a besoin de ${points} points pour cette récompense.`,
        variant: "destructive"
      });
      return;
    }
    
    const updatedClient = { 
      ...currentClient, 
      loyaltyPoints: currentClient.loyaltyPoints - points 
    };
    setCurrentClient(updatedClient);
    toast({
      title: "Points échangés",
      description: `${points} points échangés contre ${reward}.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {currentClient.name}
          <span className="text-sm font-normal bg-supermarket-blue/10 text-supermarket-blue px-2 py-1 rounded">
            Carte #{currentClient.cardId}
          </span>
        </CardTitle>
        <CardDescription>{currentClient.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="history">Historique d'achats</TabsTrigger>
            <TabsTrigger value="loyalty">Fidélité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <h3 className="mb-1 text-sm font-medium">Budget mensuel</h3>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>{currentClient.monthlySpendings.toFixed(2)} €</span>
                  <span>300.00 €</span>
                </div>
                <Progress value={budgetPercentage} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {currentClient.remainingBudget.toFixed(2)} € restants pour ce mois
                </p>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-md">
                <div className="flex items-center gap-2">
                  <GiftIcon className="h-5 w-5 text-amber-600" />
                  <span className="font-medium">Points de fidélité</span>
                </div>
                <span className="text-lg font-bold text-amber-700">{currentClient.loyaltyPoints} pts</span>
              </div>
              
              <div>
                <h3 className="mb-3 text-sm font-medium">Dépenses mensuelles</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlySpendingData}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2} />
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}€`}
                      />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#3B82F6" 
                        fillOpacity={1} 
                        fill="url(#colorAmount)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                      Aucun achat enregistré
                    </TableCell>
                  </TableRow>
                ) : (
                  purchaseHistory.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{purchase.date}</TableCell>
                      <TableCell>{purchase.items} articles</TableCell>
                      <TableCell className="text-right font-medium">{purchase.amount.toFixed(2)} €</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-md mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center gap-2">
                  <GiftIcon className="h-5 w-5 text-amber-600" />
                  Points de fidélité
                </h3>
                <span className="text-lg font-bold text-amber-700">{currentClient.loyaltyPoints} pts</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Les points sont accumulés à chaque achat et peuvent être échangés contre des récompenses.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Ajouter des points</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleAddLoyaltyPoints(10)}>
                  +10 points
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleAddLoyaltyPoints(50)}>
                  +50 points
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleAddLoyaltyPoints(100)}>
                  +100 points
                </Button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">Échanger des points</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Réduction de 5€</h4>
                    <p className="text-sm text-muted-foreground">Sur votre prochain achat</p>
                  </div>
                  <Button size="sm" onClick={() => handleRedeemPoints(50, "une réduction de 5€")}>
                    Échanger 50 pts
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Produit gratuit</h4>
                    <p className="text-sm text-muted-foreground">Article de moins de 10€</p>
                  </div>
                  <Button size="sm" onClick={() => handleRedeemPoints(100, "un produit gratuit")}>
                    Échanger 100 pts
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Livraison gratuite</h4>
                    <p className="text-sm text-muted-foreground">Pour votre prochaine commande</p>
                  </div>
                  <Button size="sm" onClick={() => handleRedeemPoints(75, "une livraison gratuite")}>
                    Échanger 75 pts
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
