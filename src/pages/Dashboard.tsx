
import { AlertsTable } from "@/components/dashboard/AlertsTable";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { BarChart3, Package, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  // Données fictives pour la démo
  const salesData = [
    { name: "Lun", sales: 4500 },
    { name: "Mar", sales: 5200 },
    { name: "Mer", sales: 4800 },
    { name: "Jeu", sales: 6100 },
    { name: "Ven", sales: 7500 },
    { name: "Sam", sales: 9200 },
    { name: "Dim", sales: 5400 },
  ];
  
  const stockData = [
    { name: "Alimentaire", stock: 450 },
    { name: "Boissons", stock: 320 },
    { name: "Hygiène", stock: 280 },
    { name: "Produits frais", stock: 175 },
    { name: "Ménager", stock: 220 },
    { name: "Autres", stock: 150 },
  ];
  
  const alerts = [
    { 
      id: "1", 
      message: "Stock de lait écrémé presque épuisé (3 unités restantes)", 
      type: "warning", 
      date: "Aujourd'hui, 10:23" 
    },
    { 
      id: "2", 
      message: "Stock de pain complet épuisé", 
      type: "danger", 
      date: "Aujourd'hui, 09:15" 
    },
    { 
      id: "3", 
      message: "Paiement refusé - Client #1245 (Jean Dupont)", 
      type: "danger", 
      date: "Hier, 18:42" 
    },
    { 
      id: "4", 
      message: "15 nouveaux clients enregistrés cette semaine", 
      type: "info", 
      date: "Hier, 14:30" 
    },
    { 
      id: "5", 
      message: "Stock de yaourts nature presque épuisé (8 unités restantes)", 
      type: "warning", 
      date: "Hier, 11:05" 
    },
  ];
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue sur votre tableau de bord ZenithMarket</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard 
          title="Ventes aujourd'hui" 
          value="9,842.35 €" 
          description="+15% vs. hier" 
          icon={ShoppingCart} 
        />
        <StatCard 
          title="Produits en stock" 
          value="1,595" 
          description="42 produits avec stock faible" 
          icon={Package} 
          iconColor="text-supermarket-warning"
        />
        <StatCard 
          title="Clients actifs" 
          value="853" 
          description="+21 nouveaux clients ce mois" 
          icon={Users}
        />
        <StatCard 
          title="Alertes" 
          value="5" 
          description="2 alertes critiques" 
          icon={BarChart3}
          iconColor="text-supermarket-danger"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <ChartCard 
          title="Ventes hebdomadaires" 
          data={salesData} 
          dataKey="sales" 
        />
        <ChartCard 
          title="Stock par catégorie" 
          data={stockData} 
          dataKey="stock" 
          color="#10B981"
        />
      </div>
      
      <div className="grid gap-6">
        <AlertsTable alerts={alerts} />
      </div>
    </div>
  );
};

export default Dashboard;
