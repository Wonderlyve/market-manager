
import { useEffect, useState } from "react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertsTable, Alert } from "@/components/dashboard/AlertsTable";
import { AreaChart, BarChart, LineChart } from "recharts";
import { Coins, TrendingUp, Package, ShoppingCart, Users } from "lucide-react";

// Données fictives pour les statistiques
const statsData = [
  {
    title: "Ventes du jour",
    icon: Coins,
    value: "5 842,50 €",
    change: "+12%",
    trend: "up",
  },
  {
    title: "Nouveaux clients",
    icon: Users,
    value: "15",
    change: "+5%",
    trend: "up",
  },
  {
    title: "Transactions",
    icon: ShoppingCart,
    value: "284",
    change: "+18%",
    trend: "up",
  },
  {
    title: "Stock moyen",
    icon: Package,
    value: "74%",
    change: "-2%",
    trend: "down",
  },
  {
    title: "Croissance",
    icon: TrendingUp,
    value: "8,2%",
    change: "+1,2%",
    trend: "up",
  },
];

// Données fictives pour le graphique des ventes
const salesData = [
  { name: "Lun", Ventes: 4200 },
  { name: "Mar", Ventes: 4500 },
  { name: "Mer", Ventes: 5100 },
  { name: "Jeu", Ventes: 4800 },
  { name: "Ven", Ventes: 6200 },
  { name: "Sam", Ventes: 7800 },
  { name: "Dim", Ventes: 4900 },
];

// Données fictives pour le graphique des produits
const productData = [
  { name: "Alimentaire", Total: 35 },
  { name: "Maison", Total: 25 },
  { name: "Hygiène", Total: 20 },
  { name: "Boissons", Total: 15 },
  { name: "Loisirs", Total: 5 },
];

// Données fictives pour le graphique des clients
const customerData = [
  { name: "Jan", Nouveaux: 20, Actifs: 45 },
  { name: "Fév", Nouveaux: 25, Actifs: 50 },
  { name: "Mar", Nouveaux: 30, Actifs: 55 },
  { name: "Avr", Nouveaux: 15, Actifs: 45 },
  { name: "Mai", Nouveaux: 35, Actifs: 60 },
  { name: "Jun", Nouveaux: 40, Actifs: 70 },
  { name: "Jul", Nouveaux: 45, Actifs: 75 },
];

// Données fictives pour les alertes
const alertsData: Alert[] = [
  {
    id: "1",
    message: "Stock bas : Lait entier (5 unités restantes)",
    type: "warning",
    date: "Il y a 15 minutes",
  },
  {
    id: "2",
    message: "Livraison retardée : Commande #45678",
    type: "info",
    date: "Il y a 2 heures",
  },
  {
    id: "3",
    message: "Produit périmé : Yaourts lot #12345",
    type: "danger",
    date: "Il y a 5 heures",
  },
  {
    id: "4",
    message: "Nouveau fournisseur approuvé : Bio Express",
    type: "info",
    date: "Aujourd'hui, 09:45",
  },
];

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(
      now.toLocaleDateString("fr-FR", options).replace(/^\w/, (c) =>
        c.toUpperCase()
      )
    );
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-gray-500">{currentDate}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statsData.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            trend={stat.trend as "up" | "down" | "neutral"}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Ventes hebdomadaires"
          subtitle="Dernière semaine"
          chart={
            <AreaChart
              data={salesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            />
          }
        />
        <ChartCard
          title="Répartition des ventes"
          subtitle="Par catégorie"
          chart={<BarChart data={productData} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Évolution clients"
            subtitle="7 derniers mois"
            chart={<LineChart data={customerData} />}
          />
        </div>
        <div>
          <AlertsTable alerts={alertsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
