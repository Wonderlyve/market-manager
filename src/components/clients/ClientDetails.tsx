
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Client } from "./ClientTable";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  const monthlySpendingData = [
    { name: "Jan", amount: 120 },
    { name: "Fév", amount: 140 },
    { name: "Mars", amount: 180 },
    { name: "Avr", amount: 200 },
    { name: "Mai", amount: 150 },
    { name: "Juin", amount: 220 },
  ];

  const budgetPercentage = (client.monthlySpendings / 300) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {client.name}
          <span className="text-sm font-normal bg-supermarket-blue/10 text-supermarket-blue px-2 py-1 rounded">
            Carte #{client.cardId}
          </span>
        </CardTitle>
        <CardDescription>{client.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="history">Historique d'achats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <h3 className="mb-1 text-sm font-medium">Budget mensuel</h3>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>{client.monthlySpendings.toFixed(2)} €</span>
                  <span>300.00 €</span>
                </div>
                <Progress value={budgetPercentage} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {client.remainingBudget.toFixed(2)} € restants pour ce mois
                </p>
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
        </Tabs>
      </CardContent>
    </Card>
  );
}
